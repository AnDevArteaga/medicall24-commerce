import type { InstitutionResponse } from '../../interfaces/allies-supabase.interface'
import type { Institution } from '../../interfaces/appoiment.interface'
import type { CitasFreePrestadorRow } from '../supabase/citasfree-prestadores'
import { DEFAULT_INSTITUTION_COVER } from '../azure/institutions'

function pickMedia(
  api: InstitutionResponse | null,
): { cover: string; banner: string; avatar: string } {
  const inst = api?.institution as Record<string, unknown> | undefined
  const cover =
    (typeof inst?.cover === 'string' && inst.cover) || DEFAULT_INSTITUTION_COVER
  const bannerRaw =
    (typeof inst?.banner === 'string' && inst.banner) ||
    (typeof inst?.bannerUrl === 'string' && inst.bannerUrl) ||
    (typeof inst?.coverUrl === 'string' && inst.coverUrl) ||
    cover
  const avatarRaw =
    (typeof inst?.avatar === 'string' && inst.avatar) ||
    (typeof inst?.photo === 'string' && inst.photo) ||
    cover

  return { cover, banner: bannerRaw, avatar: avatarRaw }
}

/** Combina fila Supabase citasfree + detalle Azure (cover/banner/avatar como en aliados). */
export function mergeCitasFreePrestadorWithInstitutionApi(
  prestador: CitasFreePrestadorRow,
  api: InstitutionResponse | null,
): Institution {
  const { cover, banner, avatar } = pickMedia(api)

  return {
    id_institucion: String(prestador.id_institucion),
    nombre_prestador: prestador.nombre_prestador,
    num_identificacion: prestador.num_identificacion,
    tipo_identificacion: 'NI',
    estado: prestador.estado,
    id_departamento: prestador.id_departamento,
    id_municipio: prestador.id_municipio,
    id_aliado: prestador.id_aliado,
    id_gestor: 0,
    cover,
    banner,
    avatar,
  }
}
