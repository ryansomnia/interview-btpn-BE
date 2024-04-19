const { Kafka, logLevel } = require("kafkajs");


const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["my-cluster-kafka-brokers.my-kafka:9092"],
  logLevel: logLevel.ERROR,
});

const producer = kafka.producer();

let producerUser = {
  main: async (req, res) => {
    const data = ({
        userName,
        accountNumber,
        emailAddress,
        identityNumber
    } = req.body);

      console.log("Langsung Kafka")
      try {
        await producer.connect();
        const data = { payload: req.body };
        const message = {
          topic: "user",
          messages: [{ value: JSON.stringify(data) }],
        };
        await producer.send(message);
        console.log("Message sent:", message);

        let ress = {
          status: "Success",
          topic: "user",
          message: "Message sent",
        };
        res.status(200).send(ress);

      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send({ error: error.message });
      } finally {
        await producer.disconnect();
    
    }
  },
};

module.exports = producerUser;
