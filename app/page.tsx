'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. إضافة أو تحديث العميل في جدول clients
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .insert([{ name, phone, address }])
        .select()
        .single();

      if (clientError) throw clientError;

      // 2. إنشاء الطلب في جدول requests
      const { error: requestError } = await supabase
        .from('requests')
        .insert([
          {
            client_id: clientData.id,
            description,
            client_address: address,
            status: 'pending',
          },
        ]);

      if (requestError) throw requestError;

      setMessage('تم إرسال طلبك بنجاح! سيتواصل معك أقرب حرفي.');
      setName('');
      setPhone('');
      setAddress('');
      setDescription('');
    } catch (err: any) {
      console.error(err);
      setMessage('حدث خطأ أثناء إرسال الطلب: ' + (err.message || 'حاول مرة أخرى'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">منصة سلّاك 🛠️</h1>
        <p className="text-sm text-center text-gray-500 mb-6">اطلب خدمة الصيانة السريعة في منطقتك</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder="مثال: أحمد المحمد"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder="09XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder="المنطقة، الشارع، البناء"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وصف المشكلة / الخدمة</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              placeholder="اشرح المشكلة باختصار (مثلاً: تسريب مياه في المطبخ)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال الطلب الآن'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-xl bg-blue-50 text-blue-700 text-sm text-center font-medium">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}

