const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.from = `Cửa hàng máy tính Techzone <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
  }

  // 1. Create a new transport
  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 2. Send
  async send(subject, text) {
    const message = {
      from: this.from,
      to: this.to,
      subject,
      html: text,
    };

    // 3. Send email
    await this.newTransport().sendMail(message);
  }

  async sendWelcome() {
    await this.send(
      'Chào mừng đến với cửa hàng máy tính Techzone!',
      `<p>Xin chào ${this.firstName} 👻 !!! Bạn vừa tạo tải khoản thành công trên trang web của chúng tôi. <a href="${this.url}">Truy cập ngay</a> </p>`
    );
  }

  async sendResetPassword() {
    await this.send(
      'Tạo lại mật khẩu',
      `<p>Xin chào ${this.firstName}. Có phải bạn vừa gửi yêu cầu lấy lại mật khẩu không? Nếu bạn vừa gửi yêu cầu hãy nhấp vào <a href="${this.url}">đây</a> để tạo mật khẩu mới.</p>`
    );
  }

  async sendChangePasswordSuccessfully() {
    await this.send(
      'Đổi mật khẩu thành công',
      `<p>Xin chào ${this.firstName}. Bạn đã thay đổi mật khẩu thành công.</p>`
    );
  }

  async sendCreateOrderSuccessfully() {
    await this.send(
      `Xin chào ${this.firstName}. Bạn đã đặt hàng tại TechZone thành công.`,
      `<p>Kiểm tra thông tin đơn hàng <a href="${this.url}">tại đây</a></p>`
    );
  }

  async sendOrderStatusChange() {
    await this.send(
      `Xin chào ${this.firstName}. Đơn hàng của bạn vừa được thay đổi trạng thái giao hàng.`,
      `<p>Đơn hàng của bạn vừa được thay đổi trạng thái giao hàng.
      Kiểm tra thông tin đơn hàng <a href="${this.url}">tại đây</a></p>`
    );
  }
};
