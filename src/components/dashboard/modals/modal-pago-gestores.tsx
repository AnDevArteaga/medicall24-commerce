import { useEffect, useState } from 'react'
import { X, Printer } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useModal } from '../../../contexts/modals'
import type { VentaParaPagoGestores } from '../../../services/supabase/sales'
import type { OrdenPagoGestores } from '../../../services/supabase/ordenes-pago-gestores'
import {
  getSiguienteNumeroOrden,
  createOrdenPago,
  getOrdenPagoById,
  updateOrdenPagoSnapshot,
  asignarOrdenARegistrosCompra,
} from '../../../services/supabase/ordenes-pago-gestores'
import { getRegistrosCompraPorOrdenPago } from '../../../services/supabase/sales'
import { getGestorById } from '../../../services/supabase/gestores'
import { getBancos } from '../../../services/supabase/banks'
import ButtonForm from '../../ui/button-forms'
import Loader from '../../ui/loader'
import { capitalize } from '../../../utils/forms'

export type ModalPagoGestoresMode = 'preview' | 'view'

export interface ModalPagoGestoresProps {
  mode: ModalPagoGestoresMode
  items?: VentaParaPagoGestores[]
  ordenId?: number
  onClose?: () => void
}

const MODAL_NAME = 'modalPagoGestores'

function valorAPagar(total: number, porcentaje: number): number {
  return (total * porcentaje) / 100
}

function formatFecha(fecha: string | null | undefined): string {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

export default function ModalPagoGestores() {
  const { closeModal, getModalProps } = useModal()
  const props = getModalProps<ModalPagoGestoresProps>(MODAL_NAME)

  const [phase, setPhase] = useState<'fase1' | 'fase2'>('fase1')
  const [siguienteNumero, setSiguienteNumero] = useState<number | null>(null)
  const [orden, setOrden] = useState<OrdenPagoGestores | null>(null)
  const [items, setItems] = useState<VentaParaPagoGestores[]>([])
  const [comentarios, setComentarios] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [bankDisplay, setBankDisplay] = useState<{
    banco_nombre: string
    tipo_cuenta: string
    numero_cuenta: string
    titular_cuenta: string
    nit_titular: string
  } | null>(null)

  const isViewMode = props?.mode === 'view'
  const isPreviewMode = props?.mode === 'preview'

  const totalOrden = items.reduce(
    (sum, v) =>
      sum + valorAPagar(v.total ?? 0, v.porcentaje_comision_gestor ?? 0),
    0,
  )

  useEffect(() => {
    if (!props) return

    if (isViewMode && props.ordenId) {
      setLoading(true)
      setPhase('fase2')
      Promise.all([
        getOrdenPagoById(props.ordenId),
        getRegistrosCompraPorOrdenPago(props.ordenId),
      ])
        .then(([ord, regs]) => {
          setOrden(ord ?? null)
          setItems(regs)
          setComentarios(ord?.comentarios ?? '')
          if (ord?.banco_nombre != null || ord?.numero_cuenta != null) {
            setBankDisplay({
              banco_nombre: ord.banco_nombre ?? '',
              tipo_cuenta: ord.tipo_cuenta ?? '',
              numero_cuenta: ord.numero_cuenta ?? '',
              titular_cuenta: ord.titular_cuenta ?? '',
              nit_titular: ord.nit_titular ?? '',
            })
          }
        })
        .finally(() => setLoading(false))
      return
    }

    if (isPreviewMode && props.items?.length) {
      setItems(props.items)
      setPhase('fase1')
      getSiguienteNumeroOrden().then(setSiguienteNumero)
      setLoading(false)
    }
  }, [props?.mode, props?.ordenId, props?.items?.length])

  // En fase 2, si no hay snapshot en la orden, cargar datos del gestor para mostrar
  useEffect(() => {
    if (phase !== 'fase2' || !orden?.id_gestor || bankDisplay) return
    const hasSnapshot =
      orden.banco_nombre != null ||
      orden.numero_cuenta != null ||
      orden.titular_cuenta != null
    if (hasSnapshot) {
      setBankDisplay({
        banco_nombre: orden.banco_nombre ?? '',
        tipo_cuenta: orden.tipo_cuenta ?? '',
        numero_cuenta: orden.numero_cuenta ?? '',
        titular_cuenta: orden.titular_cuenta ?? '',
        nit_titular: orden.nit_titular ?? '',
      })
      return
    }
    let cancelled = false
    Promise.all([getGestorById(orden.id_gestor), getBancos()]).then(
      ([gestor, bancos]) => {
        if (cancelled || !gestor) return
        const banco = gestor.id_banco
          ? bancos.find((b) => b.id_banco === gestor.id_banco)
          : null
        setBankDisplay({
          banco_nombre: banco?.nombre_banco ?? '',
          tipo_cuenta: gestor.tipo_cuenta ?? '',
          numero_cuenta: gestor.numero_cuenta_bancaria ?? '',
          titular_cuenta: gestor.representante_legal ?? '',
          nit_titular: gestor.num_identificacion ?? '',
        })
      },
    )
    return () => {
      cancelled = true
    }
  }, [
    phase,
    orden?.id,
    orden?.id_gestor,
    orden?.banco_nombre,
    orden?.numero_cuenta,
    orden?.titular_cuenta,
    bankDisplay,
  ])

  const handleProcesarPago = async () => {
    if (items.length === 0) return
    const idGestor = items[0].id_gestor
    if (!idGestor) return

    setProcessing(true)
    try {
      const total = items.reduce(
        (sum, v) =>
          sum + valorAPagar(v.total ?? 0, v.porcentaje_comision_gestor ?? 0),
        0,
      )
      const nuevaOrden = await createOrdenPago({
        id_gestor: idGestor,
        total_orden: total,
      })
      if (!nuevaOrden) {
        toast.error('No se pudo crear la orden de pago')
        setProcessing(false)
        return
      }
      await asignarOrdenARegistrosCompra(
        items.map((i) => i.id_compra),
        nuevaOrden.id,
      )
      setOrden(nuevaOrden)
      setPhase('fase2')
      setBankDisplay(null)
      toast.success('Orden de pago generada correctamente')
    } catch (e) {
      console.error(e)
      toast.error('Error al procesar el pago')
    } finally {
      setProcessing(false)
    }
  }

  const handleGuardar = async () => {
    if (!orden) return

    setSaving(true)
    try {
      const gestor = orden.id_gestor
        ? await getGestorById(orden.id_gestor)
        : null
      const bancos = await getBancos()
      const banco = gestor?.id_banco
        ? bancos.find((b) => b.id_banco === gestor.id_banco)
        : null

      await updateOrdenPagoSnapshot(orden.id, {
        comentarios: comentarios || null,
        banco_nombre: banco?.nombre_banco ?? undefined,
        tipo_cuenta: gestor?.tipo_cuenta ?? undefined,
        numero_cuenta: gestor?.numero_cuenta_bancaria ?? undefined,
        titular_cuenta: gestor?.representante_legal ?? undefined,
        nit_titular: gestor?.num_identificacion ?? undefined,
      })
      const snapshot = {
        banco_nombre: banco?.nombre_banco ?? '',
        tipo_cuenta: gestor?.tipo_cuenta ?? '',
        numero_cuenta: gestor?.numero_cuenta_bancaria ?? '',
        titular_cuenta: gestor?.representante_legal ?? '',
        nit_titular: gestor?.num_identificacion ?? '',
      }
      setOrden((prev) =>
        prev
          ? { ...prev, ...snapshot, comentarios: comentarios || null }
          : null,
      )
      setBankDisplay(snapshot)
      toast.success('Comentarios y datos guardados')
      props?.onClose?.()
      closeModal(MODAL_NAME)
    } catch (e) {
      console.error(e)
      toast.error('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleImprimir = () => {
    // UI only por ahora
    toast('Función de impresión pendiente', { icon: '🖨️' })
  }

  if (!props) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-2xl border-gray-200">
          <h2 className="text-xl font-bold">
            Gestión de pagos a gestores comerciales
          </h2>
          <button
            onClick={() => {
              props?.onClose?.()
              closeModal(MODAL_NAME)
            }}
            className="p-2 rounded-lg text-white cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <>
            {/* Cabecera estado / orden */}
            <div className="flex justify-between items-center px-8 py-3">
              <span className="text-md font-medium text-primary">
                {phase === 'fase1' ? '' : formatFecha(orden?.fecha_generacion)}
              </span>
              <span
                className={`text-md font-medium text-gray-600 ${phase === 'fase1' ? 'text-gray-600' : 'text-primary font-semibold'}`}
              >
                {phase === 'fase1' ? 'Sin generar' : 'Generada'}
              </span>
              <span className="text-md font-semibold text-primary">
                Orden No.{' '}
                {phase === 'fase1'
                  ? (siguienteNumero ?? '—')
                  : (orden?.numero_orden ?? '—')}
              </span>
            </div>

            {/* Tabla ítems */}
            <div className="overflow-auto flex-1 min-h-0 px-12 py-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">
                      ID Compra
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">
                      Gestor
                    </th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">
                      Valor a pagar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((v) => (
                    <tr key={v.id_compra}>
                      <td className="px-3 py-2">{v.id_compra}</td>
                      <td className="px-3 py-2">
                        {v.gestor?.razon_social ?? '—'}
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {formatCurrency(
                          valorAPagar(
                            v.total ?? 0,
                            v.porcentaje_comision_gestor ?? 0,
                          ),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3 flex justify-end">
                <span className="font-semibold text-gray-800">
                  Total Orden{' '}
                  <span className="ml-8">{formatCurrency(totalOrden)}</span>
                </span>
              </div>

              {phase === 'fase1' && (
                <div className="mt-4">
                  <ButtonForm
                    text={processing ? 'Procesando…' : 'Procesar pago'}
                    onClick={handleProcesarPago}
                    disabled={processing}
                    loading={processing}
                  />
                </div>
              )}

              {phase === 'fase2' && (
                <>
                  <div className="mt-4 border-t border-gray-200 pt-6">
                    {/* Sección de Comentarios */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comentarios de la orden
                      </label>
                      <textarea
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400"
                        placeholder="Agrega un comentario o nota interna sobre este pago..."
                      />
                    </div>

                    {/* Título de la Sección */}
                    <h3 className="text-lg font-bold text-center text-gray-800 mb-6 bg-gray-50 py-2 rounded-md">
                      Datos de la cuenta bancaria del Gestor
                    </h3>

                    {/* Grid de Datos Bancarios */}
                    {/* Usamos grid-cols-1 para móvil, 2 para tablet y 3 para desktop para dar espacio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 border border-primary bg-primary/10 rounded-md p-2">
                      {/* Helper Component para cada campo (hace el código más limpio) */}
                      {[
                        {
                          label: 'Banco',
                          value:
                            bankDisplay?.banco_nombre ?? orden?.banco_nombre,
                          isLoading:
                            orden?.id_gestor &&
                            !orden?.banco_nombre &&
                            !bankDisplay?.banco_nombre,
                        },
                        {
                          label: 'Tipo de Cuenta',
                          value: capitalize(
                            bankDisplay?.tipo_cuenta ??
                              orden?.tipo_cuenta ??
                              '',
                          ),
                        },
                        {
                          label: '# de Cuenta',
                          value:
                            bankDisplay?.numero_cuenta ?? orden?.numero_cuenta,
                        },
                        {
                          label: 'Titular de la Cuenta',
                          value:
                            bankDisplay?.titular_cuenta ??
                            orden?.titular_cuenta,
                          isWide: true, // Opcional: podrías usar esto para que ocupe más espacio si quisieras
                        },
                        {
                          label: 'ID / NIT Titular',
                          value: bankDisplay?.nit_titular ?? orden?.nit_titular,
                        },
                      ].map((item, index) => {
                        // Lógica de limpieza y visualización
                        let displayValue = item.value
                        if (item.isLoading) displayValue = 'Cargando...'
                        else if (!displayValue) displayValue = '—'
                        else displayValue = String(displayValue).trim() // Aquí aplicamos el TRIM

                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-start w-full"
                          >
                            <span className="text-xs text-gray-900 text-center">
                              {item.label}
                            </span>

                            {/* Usamos un DIV en lugar de INPUT para permitir que el texto baje de línea (wrap) */}
                            <div className="w-full text-center text-gray-800 text-xs min-h-[40px] flex items-center justify-center break-words leading-tight">
                              {displayValue}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {phase === 'fase2' && (
              <div className="flex gap-3 justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <ButtonForm
                  text={saving ? 'Guardando…' : 'Guardar'}
                  onClick={handleGuardar}
                  disabled={saving}
                  loading={saving}
                />
                <button
                  type="button"
                  onClick={handleImprimir}
                  className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir Orden
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
