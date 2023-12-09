interface InputRuralProducer {
  cpf: string;
  cnpj: string;
  name: string;
}

interface InputFarm {
  name: string;
  city: string;
  state: string;
  total_area: number;
  agricultural_area: number;
  vegetation_area: number;
  resources: EResource[];
  rural_producer_id: number;
}

enum EResource {
  ALGODAO = "algodao",
  CAFE = "cafe",
  CANA_DE_AÇÚCAR = "cana de acucar",
  MILHO = "milho",
  SOJA = "soja",
}

export { InputRuralProducer, InputFarm, EResource };
