# Documento de Arquitetura

## 1. Contexto do Sistema

O sistema agiliza o processo de reserva de espaços em condomínios residenciais, além de facilitar o gerenciamento
de espaços ofertados e reservas realizadas.

### Principais usuários

- **Morador**: Consulta espaços disponíveis, realiza reservas e verifica histórico de reservas;
- **Administração**: Controla usuários cadastrados, espaços registrados e reservas realizadas na plataforma.

### Principais funcionalidades

- Consultar disponibilidade de espaços registrados;
- Reservar um espaço disponível;
- Consultar as reservas realizadas e seus respectivos estados, além de cancelar reservas confirmadas;
- **(Administração)** Gerar relatórios de reservas com base em períodos de tempo.

## 2. Casos de Uso

![Diagrama de Casos de Uso](../diagrams/DiagramCasoDeUso.PNG)

## 3. Arquitetura de Implantação e Serviços

A arquitetura interna da aplicação consiste nas seguintes camadas:

- Interface web de aplicação para mobile utilizada por moradores e administradores;
- Interface web de aplicação para desktop utilizada por porteiros;
- Comunicação entre camadas via SOAP/XML;
- Serviços "server-side";
- Banco de dados relacional. 

![Diagrama de Implantação](../diagrams/DiagramaDesenvolvimento.PNG)

### Principais Serviços

Os principais casos de uso da aplicação estão presentes no formato de serviços no servidor.

| Serviço                          | Responsabilidade                     |
| ----------------------------------| --------------------------------------|
| `ConsultaDisponibilidadeService` | Verificar disponibilidade de espaços |
| `ReservaEspacoService`           | Criar reservas                       |
| `ConsultaReservaService`         | Recuperar reservas                   |
| `RelatorioReservasService`       | Gerar relatórios                     |

## 4. Principais Fluxos de Usuário

### 4.1 Criar reserva

Para criar uma reserva no sistema, o usuário deve especificar o espaço que deseja reservar, data e hora de início e data e hora de fim da reserva.

![Diagrama Criar Reserva](../diagrams/diagramAtividadeCriarReserva.PNG)

### 4.2 Consultar Disponibilidade e Reservar

Antes de criar uma reserva, o usuário deve antes verificar se o espaço desejado está disponível. Espaços que já possuem uma reserva para o período de tempo escolhido ou que estejam fechados para manutenção não podem ser reservados.

![Diagrama Consultar Disponibilidade](../diagrams/diagramAtividadeConsultarReserva.PNG)

### 4.3 Cancelar reserva

Caso desista de uma reserva que já tenha sido confirmada, o usuário pode realizar o cancelamento da mesma pelo sistema. Uma reserva só pode ser cancelada caso ela não tenha sido concluída (período de tempo após o período marcado)

![Diagrama Cancelar Reserva](../diagrams/diagramAtividadeCancelarReserva.PNG)

### 4.4 Gerar relatório

O administrador, por meio do sistema, pode emitir um relatório das reservas que foram registradas durante um período de tempo que deve ser informado no formulário.

![Diagrama Relatório](../diagrams/diagramaAtividadeRelatorio.PNG)

## 5. Gerenciamento de estados

O sistema possui duas máquinas de estados, sendo estas o Espaço e a Reserva.

### 5.1 Estados do Espaço

Um Espaço pode assumir qualquer um dos seguintes estados:

- **Disponível**: O espaço está aberto e pode receber reservas;
- **Reservado**: Existe uma reserva ativa para este espaço no momento;
- **Em manutenção**: O espaço foi fechado para manutenção e não pode receber reservas.

> OBS: A implementação do sistema não contou com o estado "Aguardando" para um espaço. Será levado em consideração para versões futuras.

![Diagrama de Estado Espaço](../diagrams/diagramaEstadoEspaco.PNG)

### 5.2 Estados da Reserva

Uma reserva pode assumir qualquer um dos seguintes estados:

- **Criada**: Estado inicial, assumido imediatamente após sua criação;
- **Cancelada**: A reserva foi cancelada;
- **Concluída**: A reserva assume este estado automaticamente após passar da data e hora de fim, por meio da classe `ReservaConclusaoScheduler`.

![Diagrama de Estado Reserva](../diagrams/diagramaEstadoReserva.PNG)

## 6. Decisões de Arquitetura

### Arquitetura Orientada a Serviços

A camada de servidor deste sistema foi desenvolvida seguindo o estilo de arquitetura Orientado a Serviços, no qual o servidor disponibiliza uma série de serviços que expõem as funcionalidades do sistema.

Este estilo arquitetural foi escolhido para a camada de servidor do sistema, pois as capacidades do negócio são operações com diferentes fins sem dependência operacional entre si (ex.: "consultar a disponibilidade de um espaço" e "gerar um relatório das reservas"), fazendo com que estas capacidades possam ser facilmente mapeadas em serviços. Além disso, serviços são reutilizáveis, o que viabiliza utilizar o mesmo servidor para as duas aplicações cliente que o sistema possui.

### Escolha do Protocolo de Comunicação

O protocolo de comunicação utilizado por esta aplicação é o SOAP (Simple Object Access Protocol), que utiliza arquivos XML enviados por meio do protocolo HTTP para realizar chamadas a serviços definidos usando a WSDL (Web Service Description Language).

Este protocolo foi escolhido devido ao contrato formal estabelecido para cada serviço por meio do WSDL. Com estes contratos, cada serviço possui definições explícitas a respeito de suas entradas, saídas e pontos de acesso, garantindo a interoperabilidade entre as aplicações-cliente e o servidor Orientado a Serviços.

### Clientes separados para web e mobile

O sistema possui duas interfaces gráficas de usuário web: uma voltada para aparelhos móveis e uma voltada para aparelhos desktop. A decisão de criar duas aplicações cliente separadas para este sistema está atrelada às diferentes necessidades de interação para cada tipo de usuário.

A interface móvel foi construída para proporcionar uma experiência rápida e facilitada para que moradores possam realizar reservas a qualquer momento e administradores possam gerir as reservas realizadas e espaços disponíveis sem precisar de uma estação de trabalho dedicada. Por outro lado, a interface desktop leva em consideração o fato de que o porteiro passa boa parte de seu tempo em uma estação de trabalho fixa e a necessidade de monitorar reservas realizadas em períodos fixos de tempo (dia, semana, etc.).

### Padrão State para Espaços e Reservas

Como foi mencionado anteriormente neste documento, o sistema possui duas entidades de domínio com máquinas de estados: o Espaço e a Reserva. Para facilitar o gerenciamento de estados destas entidades, o padrão de projeto State foi utilizado.

O padrão de projeto State facilita o gerenciamento de estados de entidades como as citadas, pois permite que o objeto de uma classe possa assumir comportamentos diferentes com base no estado em que ele se encontra, eliminando lógicas condicionais complexas dentro da classe para tratar cada um de seus possíveis estados.

### Camada de Repository

Os métodos de chamada ao banco de dados para cada uma das entidades do domínio são feitos por classes Repository. Estas classes atuam como intermediários para que as classes de serviço possam obter informações presentes no armazenamento persistente. Essas classes encapsulam a lógica de persistência, permitindo que o sistema abstraia essa implementação e viabilizando a modificação dessa lógica com facilidade.

Um Proxy foi utilizado na camada de Repository (`EspacoRepositoryProxy` e `ReservaRepositoryProxy`) para interceptar chamadas antes de delegá-las ao banco real e registrar acessos realizados ao banco por meio de logs.

### PostgreSQL para gerenciar o Banco de Dados

Para gerenciar o banco de dados, o sistema relacional PostgreSQL foi escolhido. Essa escolha foi feita levando em consideração as fortes relações entre as entidades do domínio (reserva com espaço, usuário com reserva, etc.) e a familiaridade do grupo de desenvolvimento com o sistema.

### Migrations do Banco de Dados

A ferramenta "Flyway" foi utilizada para gerenciar as mudanças de esquema no banco de dados para prevenir problemas de divergência entre esquemas de banco de dados em diferentes ambientes. Isto é feito por meio do versionamento do esquema por parte da ferramenta, tratando cada mudança como uma nova versão, no formato de "migrations".

## 7. Mapeamento Diagrama-Implementação

| Elemento de Arquit.   | Implementação                           |
| -----------------------| -----------------------------------------|
| Endpoints SOAP        | `api/.../endpoint`                      |
| Configuração SOAP     | `api/.../config`                        |
| Contratos WSDL        | `api/src/main/resources/wsdl`           |
| Serviços do negócio   | `api/.../service`                       |
| Scheduler de Reservas | `api/.../scheduler`                     |
| Estados do Espaço     | `api/.../state/espaco`                  |
| Estados da Reserva    | `api/.../state/reserva`                 |
| Persistência          | `api/.../repository`                    |
| Proxy de Persistência | `api/.../repository` (classes `*Proxy`) |
| Esquema do BD         | `api/src/main/resources/db/migration`   |

## 8. Restrições e Pressupostos

- Uma reserva se aplica apenas a um espaço e um período de tempo;
- Reservas que já foram concluídas não podem ser canceladas;
- Disponibilidade depende do estado do Espaço e de reservas existentes;
- Clientes Web e Mobile consomem os mesmos serviços SOAP.
