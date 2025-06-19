🚀 Projeto de Automação com Ansible, Docker e GitLab CI/CD

Bem-vindo ao repositório do Projeto de Automação! Este projeto utiliza uma imagem Docker com Linux 24 Noble Numbat instalado, utilizando o Ansible para automação e gerenciamento de configurações.

📂 Estrutura do Repositório

O repositório contém os seguintes arquivos e diretórios:

    Dockerfile: Define a imagem Docker, incluindo a instalação do Ansible e outras ferramentas necessárias.
    Playbooks: Inclui os playbooks Ansible e outros arquivos necessários para o workflow.
    GitLab CI/CD: Contém os arquivos de workflow do GitLab CI/CD ⚙️ para automatizar o build e o push da imagem Docker.

🛠️ Tecnologias Utilizadas

    Docker: Uma plataforma que permite criar, implantar e executar aplicativos em contêineres. Os contêineres são ambientes leves e isolados que garantem que o software seja executado de maneira consistente em qualquer lugar.

    Ansible: Uma ferramenta de automação de TI que permite gerenciar a configuração de sistemas, implantar software e orquestrar tarefas complexas. Ansible é conhecido por sua simplicidade e facilidade de uso, utilizando uma linguagem de configuração declarativa.

    GitLab CI/CD: Um serviço de integração contínua e entrega contínua (CI/CD) que permite automatizar fluxos de trabalho de desenvolvimento de software diretamente no GitHub. Com o GitHub Actions, você pode criar fluxos de trabalho personalizados que são executados em resposta a eventos no seu repositório.

🔧 Como Utilizar

    Configure sua chave SSH pública no GitLab e teste no Git antes de começar a trabalhar.
    
    ssh -T git@gitlab.com

    Para rodar os playbooks, use o comando:

    ansible-playbook -i ./inventory/hosts ./playbooks/arquivo.yml --ask-become-pass

