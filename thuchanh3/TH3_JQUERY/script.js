$(document).ready(function () {
  console.log("jQuery is ready!");

  $('#registerForm').on('submit', function (e) {
    e.preventDefault();

    // Xóa hết thông báo lỗi cũ
    $('span.error-msg').remove();

    let isValid = true;
    const fullname = $('#fullname').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();

    // Validate họ tên
    if (fullname === '') {
      isValid = false;
      $('#fullname').after('<span class="error-msg">Họ tên không được để trống</span>');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      $('#email').after('<span class="error-msg">Email không hợp lệ</span>');
    }

    // Validate mật khẩu
    if (password.length < 6) {
      isValid = false;
      $('#password').after('<span class="error-msg">Mật khẩu phải ít nhất 6 ký tự</span>');
    }

    if (!isValid) return;

    // Gửi AJAX
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts', // API giả lập
      method: 'POST',
      data: {
        fullname: fullname,
        email: email,
        password: password
      },
      beforeSend: function () {
        $('#registerForm button[type=submit]').attr('disabled', true).text('Đang gửi...');
      },
      success: function (response) {
        console.log('Server trả về:', response);

        // Cập nhật nội dung chi tiết
        $('#detail-fullname').text(fullname);
        $('#detail-email').text(email);

        // Ẩn form bằng hiệu ứng slideUp
        $('#registerForm').slideUp(400, function () {
          // Hiển thị div chúc mừng
          $('#successMessage').fadeIn();
        });
      },
      error: function () {
        alert('Server bận, vui lòng thử lại sau');
      },
      complete: function () {
        $('#registerForm button[type=submit]').attr('disabled', false).text('Đăng ký');
      }
    });
  });

  // Nút "Xem chi tiết"
  $('#showDetailsBtn').on('click', function () {
    $('#details').slideToggle();
  });
});
