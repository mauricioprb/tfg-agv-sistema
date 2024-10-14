////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter"; // For filtering

// Define the shape of Operator data
export type Operador = {
  id: string;
  data: string;
  operador: string;
  evento: string;
};

// Mock data for operator activities
export const fakeRegistroAtividades = {
  getRegistros: async () => {
    return {
      total_registros: 50,
      registros: [
        {
          id: "1",
          data: "2023-10-01T10:00:00Z",
          operador: "Operador 1",
          evento: "gomes",
        },
        {
          id: "2",
          data: "2023-10-01T10:00:00Z",
          operador: "Operador 2",
          evento: "",
        },
        {
          id: "3",
          data: "2023-10-01T10:00:00Z",
          operador: "Operador 3",
          evento: "juse",
        },
      ],
    };
  },
};

// Mock operator data store
export const fakeOperadores = {
  records: [] as Operador[], // Holds the list of operator objects

  // Initialize with sample data
  initialize() {
    const sampleOperadores: Operador[] = [
      {
        id: "1",
        data: "2023-10-01T10:00:00Z",
        operador: "Operador 1",
        evento: "gomes",
      },
      {
        id: "2",
        data: "2023-10-01T10:00:00Z",
        operador: "Operador 2",
        evento: "",
      },
      {
        id: "3",
        data: "2023-10-01T10:00:00Z",
        operador: "Operador 3",
        evento: "juse",
      },
    ];

    this.records = sampleOperadores;
  },

  // Get all operators with optional search filtering
  async getAll({ search }: { search?: string }) {
    let operadores = [...this.records];

    if (search) {
      operadores = matchSorter(operadores, search, {
        keys: ["operador", "evento"],
      });
    }

    return operadores;
  },

  // Get paginated results with optional search
  async getOperadores({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) {
    const allOperadores = await this.getAll({});
    const totalOperadores = allOperadores.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedOperadores = allOperadores.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_operadores: totalOperadores,
      offset,
      limit,
      operadores: paginatedOperadores,
    };
  },
};

// Initialize sample operators
fakeOperadores.initialize();
