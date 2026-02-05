export interface SalesAgent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
}

export const salesAgents: SalesAgent[] = [
  {
    id: "agent-1",
    name: "Juan Pérez",
    title: "Asesor de Ventas Senior",
    email: "juan.perez@rhinoautoglass.mx",
    phone: "+52 55 1234 5678",
    photo: "/agents/juan-perez.jpg", // Add agent photos to /public/agents/
    bio: "Especialista en vidrio automotriz con más de 10 años de experiencia. Experto en medallones y costados."
  },
  {
    id: "agent-2",
    name: "María González",
    title: "Asesora de Ventas",
    email: "maria.gonzalez@rhinoautoglass.mx",
    phone: "+52 55 2345 6789",
    photo: "/agents/maria-gonzalez.jpg",
    bio: "Especializada en atención personalizada y servicio a domicilio. 8 años de experiencia en el sector automotriz."
  },
  {
    id: "agent-3",
    name: "Carlos Rodríguez",
    title: "Asesor de Ventas",
    email: "carlos.rodriguez@rhinoautoglass.mx",
    phone: "+52 55 3456 7890",
    photo: "/agents/carlos-rodriguez.jpg",
    bio: "Experto en cristales para vehículos de lujo y alta gama. Servicio de instalación premium."
  },
  {
    id: "agent-4",
    name: "Ana Martínez",
    title: "Asesora de Ventas",
    email: "ana.martinez@rhinoautoglass.mx",
    phone: "+52 55 4567 8901",
    photo: "/agents/ana-martinez.jpg",
    bio: "Especialista en vidrio para flotillas y empresas. Soluciones personalizadas para tu negocio."
  },
  {
    id: "agent-5",
    name: "Roberto Sánchez",
    title: "Asesor de Ventas Senior",
    email: "roberto.sanchez@rhinoautoglass.mx",
    phone: "+52 55 5678 9012",
    photo: "/agents/roberto-sanchez.jpg",
    bio: "Más de 15 años de experiencia en cristales automotrices. Atención especializada y garantía de calidad."
  }
];

/**
 * Get a sales agent by their ID
 * @param id - The unique identifier of the agent
 * @returns The sales agent or undefined if not found
 */
export function getAgentById(id: string): SalesAgent | undefined {
  return salesAgents.find(agent => agent.id === id);
}

/**
 * Get all sales agents
 * @returns Array of all sales agents
 */
export function getAllAgents(): SalesAgent[] {
  return salesAgents;
}
