import React from 'react';

import '../../sass/_footer.scss';

export default function Footer() {
    return (
        <footer>
            <div className="footer__content">
                <div className="footer__info">
                    <span>THÔNG TIN LIÊN HỆ</span>

                    <ul>
                        <li>HOT LINE: 090 143 22 41</li>
                        <li>Email CSKH: cskh@clmensstore.com</li>
                        <li>Email Hợp tác: info@clmensstore.com</li>
                        <li>Email phản ánh dịch vụ: phananhdichvu@clmensstore.com</li>
                    </ul>
                </div>
                <div className="footer__rules">
                    <span>{'ĐIỀU KHOẢN & QUYỀN LỢI'}</span>

                    <ul>
                        <li>{'Chính sách & quyền lợi'}</li>
                        <li>Hướng dẫn mua hàng Online</li>
                        <li>Chính sách giao hàng</li>
                        <li>{'Chính sách bảo hành & đổi trả'}</li>
                        <li>FAQs</li>
                        <li>Liên hệ cho chúng tôi</li>
                    </ul>
                </div>
                <div className="footer__following">
                    <span>ĐĂNG KÝ THEO DÕI</span>
                    <p>Chúng tôi sẽ sớm ra mắt chức năng đăng ký nhận thông tin khuyến mãi</p>
                </div>
            </div>
        </footer>
    );
}
