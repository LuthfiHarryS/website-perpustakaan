import { useEffect, useRef, useState } from 'react'
import { apiPost } from '../lib/api.js'

export function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hai! 👋\nAku bisa bantu kasih rekomendasi buku. Coba tanya kayak:\n• "Buku novel yang seru apa?"\n• "Rekomendasi buku self improvement"\n• "Ada buku filsafat yang menarik?"',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, loading])

  async function onSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages((prev) => [...prev, { from: 'user', text }])

    try {
      setLoading(true)
      const data = await apiPost('/api/chatbot', { message: text })
      setMessages((prev) => [...prev, { from: 'bot', text: data?.reply ?? '-' }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Maaf, chatbot sedang error. Coba lagi ya.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="panel mt-8 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
      <div className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💬</span>
          <div>
            <div className="font-semibold text-slate-900">Tanya rekomendasi buku</div>
            <div className="text-xs text-slate-600">
              Tanya aja, kita kasih rekomendasi berdasarkan buku yang ada!
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[320px] overflow-auto px-6 pb-4">
        <div className="space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  m.from === 'user'
                    ? 'max-w-[85%] rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white'
                    : 'max-w-[85%] rounded-2xl bg-slate-200 px-4 py-3 text-sm text-slate-900'
                }
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-slate-200 px-4 py-3 text-sm text-slate-900">
                Mengetik...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={onSend} className="px-6 pb-6">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contoh: 'Buku novel yang seru apa?' atau 'Rekomendasi buku motivasi'"
            className="w-full rounded-full bg-white px-6 py-4 text-sm shadow-inner outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Kirim'}
          </button>
        </div>
        {/* Quick prompts - Hick's Law: kurangi pilihan, buat lebih mudah */}
        <div className="mt-3 flex flex-wrap gap-2">
          {['Novel seru', 'Buku motivasi', 'Biografi menarik'].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setInput(prompt)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      </form>
    </section>
  )
}


