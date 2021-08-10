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
O usúario deve estar logado na aplicação
Ao realizar um aluguel, o estatus  do carro deverá ser alterado para indisponivel

# Devolução de Carro

**RF**
Deve Ser Possivel realizar a devolução de um carro

**RN**
Se o carro fo devolvido com menos de 24 horas, deverá ser cobrado diária completa
Ao realizar realizar a devolução de um carro, deverá ser liberado para outro aluguel
Ao relizar a devolução, o usuário deverá ser liberado para outro aluguel
Ao realizar a devolução deverá ser calculado o valor do aluguel
Caso o horario de devolução seja superior ao horario previsto de entrega, deverá se cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel
O usúario deve estar logado na aplicação



**RF**
Deve ser possivel o usúario recuperar a senha informando o e-mail
O usúario deve receber um e-mail com passo a passo para recuperação da senha
O usúario deve conseguir inserir uma nova senha

**RN**
O usúario precisa informar uma nova senha
O link enviado para a recuperação deve expirar em 3 horas

