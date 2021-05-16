# Cadastro de Carro

**RF**
Deve ser possivel cadastrar um novo carro - ok

**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente - ok
O carro deve ser cadastrado como disponibilidade padrão (true) -ok
O usuário responsavel pelo cadastro deve ser admnistrador - ok


# Listagem de Carros

**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da marca 
Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RN**
O usuário não precisa esta logado para listar os carros

# Cadastro de Especificações no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todas as especificações 
Deve ser possivel listar todos os carros

**RN**

Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro
O usuário responsavel pelo cadastro deve ser admnistrador

# Cadastro de imagens de carro

**RF**
Deve ser possivel cadastrar imagem do carro

**RNF**
Utilizar o multer para upload de arquivos

**RN**
O usuário deve cadastrar mais de uma imagem para o mesmo carro
O usuário responsavel pelo cadastro deve ser admnistrador


# Aluguel de Carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro



