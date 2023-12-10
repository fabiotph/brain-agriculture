const mockData = {
  resource: [
    { type: "soja" },
    { type: "milho" },
    { type: "algodao" },
    { type: "cafe" },
    { type: "cana de acucar" },
  ],
  ruralProducer: [
    {
      cpf: "85515437098",
      name: "Joanna Martines Souza",
    },
    {
      cnpj: "01897753000104",
      name: "Leandro Roberto Alves",
    },
    {
      cpf: "52613057050",
      cnpj: "96768628000100",
      name: "Jandira Silva Ramos",
    },
  ],
  farm: [
    {
      name: "Fazenda do Bosque Belo",
      city: "São Paulo",
      state: "SP",
      total_area: 19.2,
      agricultural_area: 1.2,
      vegetation_area: 14.1,
      resources: ["cafe", "soja", "milho"],
      rural_producer_id: 1,
    },
    {
      name: "Fazenda Feliz",
      city: "Rio de Janeiro",
      state: "RJ",
      total_area: 2.3,
      agricultural_area: 1.1,
      vegetation_area: 1.1,
      rural_producer_id: 1,
    },
    {
      name: "Fazenda Alves",
      city: "Presidente Prudente",
      state: "SP",
      total_area: 7.4,
      agricultural_area: 1,
      vegetation_area: 6.1,
      rural_producer_id: 2,
    },
    {
      name: "Fazenda Por do sol",
      city: "Minas Gerais",
      state: "MG",
      total_area: 1.8,
      agricultural_area: 0.4,
      vegetation_area: 0.9,
      rural_producer_id: 3,
    },
  ],
  farmResource: [
    {
      farm_id: 1,
      resource_id: 1,
    },
    {
      farm_id: 1,
      resource_id: 4,
    },
    {
      farm_id: 1,
      resource_id: 2,
    },
    {
      farm_id: 2,
      resource_id: 1,
    },
    {
      farm_id: 3,
      resource_id: 1,
    },
    {
      farm_id: 3,
      resource_id: 3,
    },
    {
      farm_id: 4,
      resource_id: 4
    },
  ],
};

export { mockData };
