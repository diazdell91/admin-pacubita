import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-semibold">Cubita Admin</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Plataforma de Gestión de Entregas
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Sistema integral para la administración de pedidos, usuarios, 
            artículos y logística de entregas.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span className="text-blue-100">Gestión de pedidos en tiempo real</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span className="text-blue-100">Control de usuarios y conductores</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span className="text-blue-100">Análiticas y reportes avanzados</span>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}