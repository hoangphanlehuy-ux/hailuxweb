# HAILUX — Atelier phục hồi túi hiệu cao cấp

Website tĩnh (HTML/CSS/JS, không backend). Chốt đơn qua **Zalo + Messenger**.

## Design System
Luôn đọc [DESIGN.md](DESIGN.md) TRƯỚC mọi quyết định về UI/visual.
Font, màu, spacing, aesthetic đều định nghĩa ở đó. Không tự ý lệch khỏi DESIGN.md nếu chưa được duyệt.
Khi QA, flag bất kỳ code nào không khớp DESIGN.md.

## Kế hoạch build
Xem [PLAN-PRODUCTION.md](PLAN-PRODUCTION.md) — hợp nhất 3 skill: design-consultation → design-html → figma-generate-design.

## Quy tắc bắt buộc
- **Mobile-first tuyệt đối**: 1 cột ở mobile, `clamp()` typography, tap target ≥ 44px (xuất sắc từ 320px).
- **Scroll-reveal**: mọi section bọc `.scroll-reveal` + `IntersectionObserver`.
- **Không số liệu bịa**: dùng dữ liệu thật (Est. 2023, 15 chuyên gia, thợ 5–10 năm). Không đăng review giả — xem "Trust & Data Rules" trong DESIGN.md.
- **CTA**: mọi nút mua/tư vấn → Zalo hoặc Messenger.
- **Báo cáo bằng Tiếng Việt** (giữ thuật ngữ kỹ thuật: CSS, HTML, clamp(), IntersectionObserver...).
