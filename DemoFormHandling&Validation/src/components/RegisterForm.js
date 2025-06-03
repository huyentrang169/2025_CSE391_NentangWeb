import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import confetti from 'canvas-confetti';
import '../styles/form.css';

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email không hợp lệ'),
  password: yup.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  accept: yup.boolean().oneOf([true], 'Bạn phải tích vào để được 10 điểm')
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({});

  const onSubmit = (data) => {
    setUserData(data);
    setShowPopup(true);
    confetti();
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Đăng ký tài khoản</h2>

        <label>Tên</label>
        <input type="text" {...register('name')} />
        <p className="error">{errors.name?.message}</p>

        <label>Email</label>
        <input type="email" {...register('email')} />
        <p className="error">{errors.email?.message}</p>

        <label>Mật khẩu</label>
        <input type="password" {...register('password')} />
        <p className="error">{errors.password?.message}</p>

        <label>Xác nhận mật khẩu</label>
        <input type="password" {...register('confirmPassword')} />
        <p className="error">{errors.confirmPassword?.message}</p>

        <label className="checkbox-label">
          <input type="checkbox" {...register('accept')} /> Tích để được 10 điểm
        </label>
        <p className="error">{errors.accept?.message}</p>

        <button type="submit">Đăng ký</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>🎉 Đăng ký thành công!</h3>
            <p>Chào mừng <strong>{userData.name}</strong> 🎈</p>
            <p>Email của bạn: <em>{userData.email}</em></p>
          </div>
        </div>
      )}
    </>
  );
}
