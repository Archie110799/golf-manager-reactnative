## Quy tắc code Frontend Golf Manager

### 1. Form & Validation
- **Sử dụng React Hook Form (RHF) kết hợp Zod** cho toàn bộ form và validation.
	- Tạo schema validation với Zod, truyền vào RHF qua `resolver`.
	- Không dùng các thư viện validation khác (yup, joi, ...).

### 2. Component hệ thống & System Design
- **Luôn sử dụng các component hệ thống** (system design) đã xây dựng sẵn trong thư mục `components/ui`, `components/layout`, ...
- Không tự ý tạo component UI mới nếu đã có trong system design.
- Nếu cần mở rộng, extend từ component hệ thống.

### 3. Tách hook/component theo Single Responsibility
- **Mỗi hook hoặc component chỉ đảm nhận một nhiệm vụ duy nhất** (single responsibility principle).
- Nếu component hoặc hook quá dài (>150 dòng), cần tách nhỏ thành các component/hook con.
- Không để logic xử lý phức tạp trong component UI, nên tách ra hook riêng.

### 4. Tách section settings thành component riêng nếu >150 dòng
- Nếu một section (ví dụ: settings, form section, tab section, ...) vượt quá 150 dòng code, phải tách thành component riêng.
- Đặt tên rõ ràng, dễ hiểu, đúng chức năng.

### 5. Quản lý state
- **Luôn dùng Zustand** để quản lý state dạng multiple (nhiều trạng thái/phân mảnh/phức tạp).
- Không dùng useState cho các state dùng chung nhiều nơi hoặc phức tạp.
- Tránh dùng Context API cho state phức tạp, chỉ dùng cho theme, config, ...

### 6. Fetching dữ liệu
- **Luôn dùng React Query** để fetch dữ liệu từ API.
- Không fetch trực tiếp trong component, luôn tách ra hook (ví dụ: useBookings, useUserProfile, ...).
- Sử dụng các tính năng của React Query: caching, refetch, invalidate, ...

### 7. Quy tắc đặt tên
- Tên component, hook, biến, function phải rõ ràng, tiếng Anh, đúng chức năng.
- Không viết tắt khó hiểu.

### 8. Khác
- Viết comment cho các đoạn code phức tạp.
- Luôn viết test cho các logic/phần quan trọng.

---
**Mọi code mới hoặc refactor phải tuân thủ các quy tắc trên. Reviewer có quyền yêu cầu sửa lại nếu vi phạm.**


### Prompt 
Code feature mới (FE + BE)
1. Agent BE: @api-goft-manager/ .
2. Agent FE: @golf-manager/
3. Agent Test: typecheck cho cả FE + BE
Mỗi agent verify độc lập trước khi merge.
Yêu cầu:
- Tuân thủ frontend-conventions.md
- Code Hoàn thiện các chức năng auth gồm register, forgot pasword, login