import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductForm({ mode }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewImages, setPreviewImages] = useState([]); // ✅ preview gallery

    // ✅ luôn định nghĩa đầy đủ các field
    const [form, setForm] = useState({
        name: "",
        category_id: "",
        price: "",
        original_price: "",
        stock: "",
        featured: false,
        image: null,         // ảnh chính (File)
        images: [],          // ✅ danh sách ảnh phụ
        old_image: "",
        description: "",
    });

    // ✅ load categories từ API
    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/categories")
            .then(res => setCategories(res.data.data ?? res.data));
    }, []);

    // ✅ Load product nếu editing
    useEffect(() => {
        if (mode === "edit") {
            axios.get(`http://localhost:8000/api/admin/products/${id}`)
                .then(res => {
                    const data = res.data;

                    setForm({
                        name: data.name ?? "",
                        category_id: data.category_id ?? "",
                        price: data.price ?? "",
                        original_price: data.original_price ?? "",
                        stock: data.stock ?? "",
                        featured: data.featured == 1,
                        description: data.description ?? "",
                        image: null,
                        images: [],
                        old_image: data.image_url ?? "",
                    });

                    if (data.image_url) {
                        setPreviewImage(data.image_url);
                    }

                    // ✅ preview các ảnh phụ
                    if (data.images && data.images.length > 0) {
                        setPreviewImages(data.images.map(img => img.image_url));
                    }
                });
        }
    }, [id, mode]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("category_id", form.category_id);
        formData.append("price", form.price);
        formData.append("original_price", form.original_price);
        formData.append("stock", form.stock);
        formData.append("featured", form.featured ? 1 : 0);
        formData.append("description", form.description);

        // ảnh chính
        if (form.image instanceof File) {
            formData.append("image", form.image);
        }

        // ảnh phụ (gallery)
        if (form.images.length > 0) {
            [...form.images].forEach(file => {
                formData.append("images[]", file);
            });
        }

        if (mode === "create") {
            await axios.post("http://localhost:8000/api/admin/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            await axios.post(
                `http://localhost:8000/api/admin/products/${id}?_method=PUT`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        }

        navigate("/admin/products");
    };

    return (
        <div className="container">
            <h2>{mode === "edit" ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}</h2>

            <form onSubmit={handleSubmit}>
                <label>Tên sản phẩm</label>
                <input className="input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />

                <label>Danh mục</label>
                <select className="input"
                    value={form.category_id}
                    onChange={e => setForm({ ...form, category_id: e.target.value })}>
                    <option value="">-- chọn danh mục --</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <label>Giá bán</label>
                <input type="number" className="input"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })} />

                <label>Giá gốc</label>
                <input type="number" className="input"
                    value={form.original_price}
                    onChange={e => setForm({ ...form, original_price: e.target.value })} />

                <label>Tồn kho</label>
                <input type="number" className="input"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })} />

                <label>
                    <input type="checkbox"
                        checked={form.featured}
                        onChange={e => setForm({ ...form, featured: e.target.checked })} />
                    Sản phẩm nổi bật
                </label>

                {/* ========== ẢNH CHÍNH ========== */}
                <label>Ảnh chính</label>
                <input type="file" className="input"
                    onChange={(e) => {
                        setForm({ ...form, image: e.target.files[0] });
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    }} />

                {previewImage && (
                    <img src={previewImage} height="120" style={{ marginTop: 10 }} />
                )}

                {/* ========== ẢNH PHỤ NHIỀU ========== */}
                <label>Ảnh phụ (nhiều ảnh)</label>
                <input type="file" className="input" name="images[]" multiple
                    onChange={(e) => {
                        setForm({ ...form, images: e.target.files });
                        setPreviewImages([...e.target.files].map(file => URL.createObjectURL(file)));
                    }} />

                {/* Preview gallery */}
                {previewImages.length > 0 && (
                    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        {previewImages.map((img, i) => (
                            <img key={i} src={img} height="80" />
                        ))}
                    </div>
                )}

                <label>Mô tả</label>
                <textarea className="input"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />

                <button type="submit" className="btn btn-primary">
                    {mode === "edit" ? "💾 Lưu thay đổi" : "✅ Tạo mới"}
                </button>
            </form>
        </div>
    );
}
