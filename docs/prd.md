# Chan Mây Foods - Landing Page

🍜 **Vị Ngon Trứ Danh - Chan thôi không cần nêm nếm!**

Landing page chuyên nghiệp cho thương hiệu nước xốt Chan Mây Foods.

## 🎨 Thiết kế

- **Mobile-first**: Tối ưu cho thiết bị di động
- **Màu sắc**: Cam/vàng đất (#D4713D), Đỏ burgundy (#8B2D35), Kem (#F5F0E8)
- **Typography**: Playfair Display (tiêu đề) + Be Vietnam Pro (nội dung)
- **Phong cách**: Vietnamese Traditional + Modern

## 📁 Cấu trúc thư mục

```
chanmay-landing/
├── index.html          # Trang chính
├── styles.css          # Stylesheet
├── script.js           # JavaScript
├── README.md           # Hướng dẫn
└── images/             # Thư mục ảnh
    ├── logo.jpeg       # Logo Chan Mây Foods
    ├── xot-pho-mai-1.jpeg
    ├── xot-pho-mai-2.jpeg
    ├── xot-pho-mai-3.jpeg
    ├── muoi-ot-xiem-xanh.jpeg
    ├── muoi-ot-hiem-do.jpeg
    ├── xot-sate-tom.jpeg
    ├── xot-sate-bowl.jpeg
    ├── food-noodles.jpeg
    ├── hero-banner.png
    └── products-all.png
```

## 🖼️ Hướng dẫn thay ảnh

1. Tạo thư mục `images` nếu chưa có
1. Copy các ảnh sản phẩm vào thư mục `images` với tên file như sau:

|Tên file                |Mô tả                   |
|------------------------|------------------------|
|`logo.jpeg`             |Logo tròn Chan Mây Foods|
|`xot-pho-mai-1.jpeg`    |Ảnh xốt phô mai (hero)  |
|`xot-pho-mai-2.jpeg`    |Ảnh xốt phô mai (story) |
|`muoi-ot-xiem-xanh.jpeg`|Muối ớt xiêm xanh       |
|`muoi-ot-hiem-do.jpeg`  |Muối ớt hiểm đỏ         |
|`xot-sate-tom.jpeg`     |Xốt sate tôm jambon     |
|`food-noodles.jpeg`     |Ảnh món mì trộn         |

## 🔗 Cập nhật Deeplinks

Mở file `script.js` và tìm đến phần `DEEPLINK HANDLING`, thay thế các URL:

```javascript
const deeplinks = {
    zalo: 'https://zalo.me/YOUR_ZALO_ID',           // Thay YOUR_ZALO_ID
    messenger: 'https://m.me/chanmayfoods',         // Thay tên page
    facebook: 'https://facebook.com/chanmayfoods',  // Thay URL Facebook
    shopee: 'https://shopee.vn/chanmayfoods',       // Thay URL Shopee
    tiktok: 'https://www.tiktok.com/@chanmayfoods', // Thay TikTok
    instagram: 'https://instagram.com/chanmayfoods' // Thay Instagram
};
```

## 🚀 Deploy lên GitHub Pages

### Bước 1: Tạo Repository

1. Đăng nhập GitHub
1. Click **“New repository”**
1. Đặt tên: `chanmayfoods` hoặc `chanmay-landing`
1. Chọn **Public**
1. Click **“Create repository”**

### Bước 2: Upload files

**Cách 1: Qua GitHub Web**

1. Trong repository mới, click **“uploading an existing file”**
1. Kéo thả tất cả files vào
1. Click **“Commit changes”**

**Cách 2: Qua Git CLI**

```bash
git init
git add .
git commit -m "Initial commit - Chan Mây Foods Landing Page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chanmayfoods.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages

1. Vào **Settings** của repository
1. Scroll xuống **Pages** (sidebar trái)
1. **Source**: Chọn `Deploy from a branch`
1. **Branch**: Chọn `main` và `/ (root)`
1. Click **Save**

### Bước 4: Truy cập website

Sau 1-2 phút, website sẽ có tại:

```
https://YOUR_USERNAME.github.io/chanmayfoods/
```

## 📱 Tính năng

- ✅ Responsive (Mobile, Tablet, Desktop)
- ✅ Floating social buttons (Zalo, Messenger)
- ✅ Smooth scroll navigation
- ✅ Product cards với size selector
- ✅ Reviews slider
- ✅ Deeplink tới các sàn TMĐT
- ✅ Animation on scroll
- ✅ SEO-friendly

## 🎯 Sections

1. **Hero** - Banner chính với slogan và CTA
1. **USP** - 4 điểm nổi bật
1. **Products** - 6 sản phẩm với giá và size
1. **Inspiration** - Gợi ý món ăn
1. **Story** - Câu chuyện thương hiệu
1. **Reviews** - Đánh giá khách hàng
1. **Order** - CTA mua hàng với link Shopee/TikTok
1. **Footer** - Thông tin liên hệ

## 📞 Hỗ trợ

Nếu cần chỉnh sửa thêm, liên hệ developer hoặc sửa trực tiếp trong code.

-----

**© 2024 Chan Mây Foods. Vị Ngon Trứ Danh.**
