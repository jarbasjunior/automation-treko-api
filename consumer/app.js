const nodemailer = require('nodemailer');

var amqp = require('amqplib/callback_api');

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
        user: "jarbasoujunior@zohomail.com",
        pass: "MiJG+5F946vYen+"
    },
    tls: { rejectUnauthorized: false }
});


amqp.connect('amqp://rabbitmq:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'tasks';

        ch.assertQueue(q, { durable: true });
        ch.prefetch(1);
        console.log(" [*] Aguardando mensagens em %s. Para sair use: CTRL+C", q);
        ch.consume(q, function (msg) {

            var msgJSON = JSON.parse(msg.content.toString());
            console.log(msgJSON)
            const mailOptions = {
                from: 'jarbasoujunior@zohomail.com',
                to: msgJSON.email,
                subject: 'E-mail enviado usando Node e Rabbimq!',
                html: msgJSON.html
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(" [x] Enviando email => %s", msg.content.toString());
                }
            });

        }, { noAck: true });
    });
});




