export const nodemailer = require('nodemailer');

const sendMail = (name, link, mail) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true, 
      auth: { 
        user: "skilldrive2@mail.ru", 
        pass: "naomi2534" }
    });
  
    return transporter.sendMail({
      from: "skilldrive2@mail.ru", 
      to: mail, 
      subject: "Вы запрашивали сброс пароля в SkillDrive", 
      text: "Вы запрашивали сброс пароля?", 
      html: 
`<b style="font-size: 24px">SkillDrive</b>
<hr />
<span>
<pre>
Здравствуйте, ${name}!
Мы получили запрос на сброс вашего пароля SkillDrive. 
Перейдите, пожалуйста, по ссылке для заполнения формы:</span>
<a href="${link}">Перейти по ссылке</a>
</pre>
<pre>
<span>Если вы не запрашивали это изменение, то проигнорируйте письмо.</span>
</pre> `
  })
}

module.exports = sendMail;


