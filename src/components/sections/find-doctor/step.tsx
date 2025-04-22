import React from "react";
import { VideoIcon } from "lucide-react";

interface VideoSectionProps {
  sec: string;
  title: string;
  description: string;
  videoUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  sec,
  title,
  description,
  videoUrl,
}) => {
  return (
    <section className="container mx-auto px-4 md:px-2 py-16 md:py-8 border-l-2 border-r-2 border-gray-300 border-opacity-50">
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-12">
          {sec === "1" && (
            <div
              className="flex md:flex-col sm:flex-col justify-center items-center space-x-2 sm:space-x-0 mb-8"
              id="find"
            >
              <VideoIcon className="text-pink-600 w-12 h-12" />
              <span className="text-4xl md:text-xl sm:text-xl font-medium text-pink-600 uppercase tracking-wider">
                ¿Cómo puedo encontrar un médico?
              </span>
            </div>
          )}
          <h2 className="text-2xl md:text-2xl font-bold text-gray-500 mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-2xl md:text-lg sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Video embed */}
        <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title="Explicación de Servicios"
            allow="fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
