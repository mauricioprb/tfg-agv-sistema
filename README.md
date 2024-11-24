# **Protótipo de Veículo Automatizado para Automação Logística na Indústria 4.0**

Este projeto, desenvolvido como parte do Trabalho Final de Graduação, consiste na criação de um Veículo Guiado Automatizado (AGV) com o objetivo de otimizar a logística no contexto da Indústria 4.0. O AGV opera de forma autônoma, proporcionando eficiência, precisão e segurança no transporte de cargas em ambientes industriais.

![Funcionamento](https://i.imgur.com/BckOCQM.gif)
![Sistema](.github/sistema.gif)
![AGV](.github/agv.png)

---

## **🚧 Pré-requisitos**

### **👾 Tecnologias**

- **Node.js** (versão 20 ou superior)
- **Docker**
- **Broker MQTT**

### **🏗️ Dispositivos Físicos**

- Raspberry Pi (computador embarcado)
- Sensor ultrassônico
- ESC brushed (Controlador Eletrônico de Velocidade para motores escovados)
- Leitor RFID
- Bateria 3S (11.1V)
- Motores DC escovados
- Impressora 3D ou equipamentos de fabricação para as peças
- Rodas de 60 mm com encaixes compatíveis com os motores

---

## **🤖 Construção do Protótipo**

### **Modelagem e Impressão**

Os arquivos `.stl` necessários para impressão 3D estão disponíveis [neste repositório](https://github.com/mauricioprb/tfg-agv-robo/tree/main/stl).

O processo de fabricação inclui:

- **Impressão 3D** para a estrutura principal.
- **Corte de chapas** (ACM e MDF) para as tampas, utilizando router CNC ou corte a laser.

> **Nota:** É recomendável ter conhecimentos básicos de fabricação digital para reproduzir o protótipo.

---

### **⚡ Eletrônica**

A montagem eletrônica deve seguir o esquema abaixo. Note que, no protótipo, o ESC substitui a ponte H representada no diagrama e inclui um regulador de tensão embutido.

![Circuito](.github/circuito.jpg)

---

## **🍓 Configuração do Raspberry Pi**

Os códigos para o Raspberry Pi estão disponíveis [neste diretório](https://github.com/mauricioprb/tfg-agv-robo/tree/main). O sistema requer **Python 3** e configuração de um ambiente virtual (venv) para gerenciar dependências.

### **Passos de Configuração**

1. Ative o daemon do controlador GPIO:

   ```bash
   sudo ./start_pigpio.sh
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd tfg-agv-robo
   source venv/bin/activate
   cd src
   ```

---

## **🐝 Configuração do Broker MQTT**

O sistema utiliza o protocolo MQTT para comunicação entre o AGV e o aplicativo. É necessário configurar um broker MQTT antes de iniciar a aplicação.

### **Passos para Configurar o Broker MQTT**

1. **Instale um broker MQTT:**

   - Use brokers como [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/).

2. **Configure as credenciais do broker no arquivo `.env`:**

3. **Verifique a conectividade:**
   Use a ferramenta MQTT preferida (como [MQTTX](https://mqttx.app)) para garantir que o broker está funcionando e aceitando conexões.

---

## **🌐 Aplicativo Web**

### **Configuração**

1. Certifique-se de ter **Node.js** e **Docker** instalados.
2. Abra o projeto em sua IDE ou editor de texto preferido.
3. Crie um arquivo `.env` baseado no `.env.example` fornecido no repositório.

### **Comandos para Configuração**

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute as migrações do banco de dados:

   ```bash
   npm run dev:migrate
   ```

3. Adicione um usuário à whitelist:

   ```bash
   npm run add:usuario
   ```

4. Registre o AGV no banco de dados:

   ```bash
   npm run add:agv -- "usuario_id"
   ```

5. Popule as rotas no sistema:
   ```bash
   npm run popular:rotas
   ```

### **Execução da Aplicação**

1. Inicie os serviços Docker:

   ```bash
   npm run dev:docker
   ```

2. Em paralelo, execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

As imagens do trabalho estão [neste diretório](https://github.com/mauricioprb/tfg-agv-sistema/blob/main/IMAGENS.md).
