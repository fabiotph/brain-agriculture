# Brain-Agriculture


## :arrow_forward: Como executar
* É necessário ter o [Docker](https://www.docker.com/) instalado.

Execute o comando abaixo dentro da pasta do projeto:

`docker-compose up`

## :computer: Tecnologias usadas
* Node
* Express
* Postgres
* Docker
* Jest


## :link: Endpoints
Rota                                | Método |  Descrição
------------------------------------ | ------  | -----
/ruralProducer                         |  POST  | Cria um novo produtor rural
/ruralProducer  |  GET   |  Retorna todos os produtores rurais com suas respectivas fazendas
/ruralProducer/:id  |  GET   |  Retorna o produtor rural do id enviado com suas respectivas fazendas
/ruralProducer/:id  |  PATCH   |  Altera dados de um produtor rural
/ruralProducer/:id  |  DELETE   |  Remove o produtor rural do id enviado (soft delete)
/farm                         |  POST  | Cria uma nova fazenda
/farm  |  GET   |  Retorna todas as fazendas e seu respectivo produtor rural
/farm/:id  |  GET   |  Retorna a fazenda do id enviado e seu respectivo produtor rural
/farm/:id  |  PATCH   |  Altera dados de uma fazenda
/farm/:id  |  DELETE   |  Remove a fazenda do id enviado (soft delete)
/dashboard  |  GET   |  Retorna todas as estatísticas
/dashboard/:id  |  GET   |  Retorna as estatísticas de um produtor rural

## :book: Alguns exemplos

### POST /ruralProducer/
#### Exemplo de corpo da Requisição:
```json
{
	"cpf": "80662058054",
	"name": "Sergião Foguetes"
}
```

### POST /ruralProducer/
#### Exemplo de corpo da Requisição:
```json
{
	"cnpj": "72260643000185",
	"name": "Sandro Tobias Alves"
}
```

### POST /farm/
#### Exemplo de corpo da Requisição:
```json
{
	"name": "Fazenda Feliz",
	"city": "São Paulo",
	"state": "SP",
	"total_area": 19.2,
	"agricultural_area": 2.3,
	"vegetation_area": 14.1,
	"resources": ["cafe", "soja"],
	"rural_producer_id": 1
}
```

### GET /dashboard/
#### Exemplo de retorno da Requisição:
```json
{
	"totalFarmCount": 4,
	"total_area": 30.7,
	"total_state": [
		{
			"state": "MG",
			"total": 1,
			"percentage": 25
		},
		{
			"state": "RJ",
			"total": 1,
			"percentage": 25
		},
		{
			"state": "SP",
			"total": 2,
			"percentage": 50
		}
	],
	"total_resource": [
		{
			"type": "algodao",
			"total": 1,
			"percentage": 14.29
		},
		{
			"type": "cafe",
			"total": 2,
			"percentage": 28.57
		},
		{
			"type": "milho",
			"total": 1,
			"percentage": 14.29
		},
		{
			"type": "soja",
			"total": 3,
			"percentage": 42.86
		}
	],
	"farm_land_use": {
		"agricultural_area": {
			"total": 3.7,
			"percentage": 12.05
		},
		"vegetation_area": {
			"total": 22.2,
			"percentage": 72.31
		},
		"unused_area": {
			"total": 4.8,
			"percentage": 15.64
		}
	}
}
```

## :white_check_mark: Tests
Instale as dependências do projeto:
`npm install`

Execute o comando abaixo dentro da pasta do projeto:  
`npm run test`

