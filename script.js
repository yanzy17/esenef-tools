const APP = 'Esenef17 Affiliate Tools';
const HISTORY_KEY = 'esenef17_affiliate_history_v1';
const THEME_KEY = 'esenef17_affiliate_theme_v1';
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const rupiah = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n || 0));
const clean = v => String(v || '').trim();
const today = () => new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

const featureList = [
  ['Riset Produk', 'Cek skor potensi, angle, risiko, dan ide CTA awal.', 'riset'],
  ['Hook Generator', 'Bikin pembuka konten pendek, Threads, TikTok/Reels, edukasi, storytelling, dan soft selling.', 'hook'],
  ['Caption Generator', 'Susun caption pendek sampai storytelling dengan format Hook-Body-Solusi-Benefit-CTA.', 'caption'],
  ['CTA Generator', 'Ajakan komen, DM, cek bio, urgent halus, dan follow up yang tidak hard selling.', 'cta'],
  ['Script Video', 'Script 15, 30, 60 detik plus visual, overlay, voice over, dan CTA.', 'script'],
  ['Ide Konten', 'Kalender 30 hari untuk edukasi, review, FAQ, comparison, dan soft selling.', 'ide'],
  ['Prompt AI', 'Prompt siap copy untuk riset, angle, hook, caption, reply DM, dan evaluasi konten.', 'prompt'],
  ['Reply DM', 'Balasan komentar/DM yang santai, trust building, dan closing halus.', 'reply'],
  ['Kalkulator Komisi', 'Hitung komisi per penjualan, total komisi, target sales, dan estimasi traffic.', 'kalkulator']
];

function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => el.classList.remove('show'), 1800); }
function escapeHtml(str) { return String(str || '').replace(/[&<>'"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[m])); }
function formData(form) { return Object.fromEntries(new FormData(form).entries()); }
function list(items) { return `<ol>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ol>`; }
function bullets(items) { return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`; }
function section(title, html) { return `<div class="result-section"><h3>${escapeHtml(title)}</h3>${html}</div>`; }
function itemCards(items) { return items.map((it, idx) => `<div class="item-card"><h4>${idx + 1}. ${escapeHtml(it.title)}</h4><p><strong>Kenapa cocok:</strong> ${escapeHtml(it.why)}</p><p><strong>Hook:</strong> ${escapeHtml(it.hook)}</p><p><strong>Caption:</strong> ${escapeHtml(it.caption)}</p><p><strong>CTA:</strong> ${escapeHtml(it.cta)}</p></div>`).join(''); }
function toPlainText(root) { return root.innerText.replace(/\n{3,}/g, '\n\n').trim(); }
function download(name, content, type = 'text/plain') { const blob = new Blob([content], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); URL.revokeObjectURL(a.href); }
function history() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } }
function saveHistory(items) { localStorage.setItem(HISTORY_KEY, JSON.stringify(items)); renderHistory(); }
function addHistory(tool, product, result) { const items = history(); items.unshift({ id: crypto.randomUUID(), tool, product: product || '-', date: new Date().toISOString(), result }); saveHistory(items); toast('Tersimpan ke riwayat'); }

function renderOutput(tool, title, html, product = '-') {
  const out = $(`#output-${tool}`); if (!out) return;
  out.innerHTML = `<div class="result-head"><div><p class="eyebrow">Hasil Generate</p><h2>${escapeHtml(title)}</h2></div><div class="result-actions"><button class="btn secondary" data-copy-output type="button">Copy hasil</button><button class="btn ghost" data-save-output type="button">Simpan ke riwayat</button><button class="btn ghost" data-export-output type="button">Export TXT</button></div></div><div class="result-body">${html}</div>`;
  const body = $('.result-body', out);
  $('[data-copy-output]', out).onclick = () => navigator.clipboard.writeText(toPlainText(body)).then(() => toast('Hasil dicopy'));
  $('[data-save-output]', out).onclick = () => addHistory(title, product, toPlainText(body));
  $('[data-export-output]', out).onclick = () => download(`${tool}-${Date.now()}.txt`, toPlainText(body));
}

function riset(d) {
  const harga = Number(d.harga || 0), komisi = Number(d.komisi || 0);
  let score = 45;
  if (harga > 0 && harga <= 150000) score += 12; else if (harga <= 350000) score += 6; else score -= 8;
  if (komisi >= 20) score += 14; else if (komisi >= 10) score += 9; else if (komisi > 0) score += 4;
  score += d.viral === 'Tinggi' ? 14 : d.viral === 'Sedang' ? 7 : -4;
  score += d.kompetisi === 'Tinggi' ? -13 : d.kompetisi === 'Sedang' ? -4 : 8;
  if (clean(d.benefit).length > 18) score += 10;
  if (clean(d.masalah).length > 18) score += 10;
  score = Math.max(1, Math.min(100, Math.round(score)));
  const risk = [];
  if (!d.niche || d.niche.length < 6) risk.push('Produk terlalu umum, coba niche dibuat lebih spesifik.');
  if (harga > 300000) risk.push('Harga terlalu tinggi untuk impulse buying, butuh edukasi dan trust lebih kuat.');
  if (d.kompetisi === 'Tinggi') risk.push('Kompetisi terlalu ramai, perlu angle yang lebih personal dan bukti visual.');
  if (d.viral !== 'Tinggi') risk.push('Butuh bukti visual agar orang cepat paham manfaatnya.');
  risk.push('Butuh edukasi sebelum closing kalau audiens belum sadar masalahnya.');
  const layak = score >= 70 ? 'Layak dipromosikan. Produk punya kombinasi masalah, benefit, komisi, dan potensi konten yang cukup kuat.' : score >= 50 ? 'Masih bisa dites. Mulai dari konten edukasi dan soft selling sebelum push CTA.' : 'Perlu divalidasi lagi. Cari pembeda, proof, atau produk alternatif yang benefitnya lebih jelas.';
  return section('Skor potensi produk', `<div class="score-card"><div class="score-badge">${score}</div><p>${escapeHtml(layak)}</p></div>`) +
    section('Ringkasan riset', bullets([`Target paling cocok: ${d.target}`, `Pain point audiens: ${d.masalah}`, `Benefit utama yang harus diangkat: ${d.benefit}`, `Angle terbaik: dari masalah harian ${d.target}, tunjukkan perubahan kecil yang bisa dirasakan setelah memakai ${d.produk}.`, `Platform awal: ${d.platform}`])) +
    section('Jenis konten yang cocok', bullets(['Review jujur dengan contoh penggunaan', 'Before after yang visual', 'Edukasi singkat soal masalah audiens', 'Problem solution', 'Storytelling pengalaman pemula', 'Comparison dengan cara lama', 'Testimoni atau social proof', 'Unboxing dan first impression'])) +
    section('Ide hook awal', list([`Kalau kamu ${d.target} dan sering ngerasa ${d.masalah}, ini wajib dicek.`, `Aku baru sadar ${d.produk} bisa bantu ${d.benefit} tanpa ribet.`, `Jangan beli ${d.produk} sebelum tahu cara pilih yang cocok buat kebutuhanmu.`])) +
    section('Ide CTA', bullets([`Komen MAU kalau pengen aku kirim detail ${d.produk}.`, 'Cek bio ya, aku taruh linknya di sana.', 'Kalau masih bingung cocok atau nggak, DM aja dulu.'])) +
    section('Catatan risiko', bullets(risk));
}

const angleTypes = ['promosi', 'edukasi', 'storytelling', 'soft selling', 'problem-solution', 'kontroversial halus'];
function makeAngles(d) {
  const counts = [15,5,5,5,5,5];
  return angleTypes.map((type, ti) => section(`${counts[ti]} angle ${type}`, itemCards(Array.from({ length: counts[ti] }, (_, i) => ({
    title: `${type} #${i + 1}: ${d.produk} untuk ${d.target}`,
    why: `Cocok karena mengaitkan ${d.masalah} dengan manfaat ${d.benefit} secara spesifik di ${d.platform || 'platform pilihanmu'}.`,
    hook: type === 'kontroversial halus' ? `Mungkin bukan produknya yang jelek, cara pakainya aja yang belum pas.` : `Buat kamu yang ${d.masalah}, coba lihat ini dulu.`,
    caption: `${d.produk} bisa jadi solusi praktis kalau kamu ingin ${d.benefit} tanpa harus mulai dari cara yang ribet.`,
    cta: `Kalau mau detailnya, komen INFO ya.`
  }))))).join('');
}

function hooks(d) {
  const packs = [['20 hook pendek',20],['10 hook Threads',10],['10 hook TikTok/Reels',10],['10 hook edukasi',10],['10 hook storytelling',10],['10 hook soft selling',10],['10 hook clickbait halus',10]];
  const base = [`Kalau kamu ${d.target}, ini bisa bantu banget.`, `Masalah ${d.masalah} ternyata bisa dimulai dari sini.`, `Aku kira ribet, ternyata ${d.produk} sesimpel itu.`, `Stop scroll kalau kamu lagi cari solusi buat ${d.masalah}.`, `Ini bukan magic, tapi ${d.benefit} jadi lebih gampang.`];
  return packs.map(([name, count]) => section(name, list(Array.from({ length: count }, (_, i) => `${base[i % base.length]} (${d.tone}, ${d.platform || 'multi platform'})`)))).join('');
}

function captions(d) {
  const names = ['Caption pendek','Caption medium','Caption storytelling','Caption edukasi','Caption soft selling','Caption Threads','Caption TikTok/IG','Caption WhatsApp','Caption Telegram'];
  return names.map(name => section(name, `<div class="caption-box"><strong>Hook</strong>\nBuat kamu yang sering ngalamin ${escapeHtml(d.masalah)}, ini bisa jadi jalan ninja kecil.\n\n<strong>Body</strong>\n${escapeHtml(d.produk)} ada di kategori ${escapeHtml(d.kategori)} dan cocok buat ${escapeHtml(d.target)} yang pengen solusi lebih praktis.\n\n<strong>Solusi</strong>\nFokusnya bukan cuma beli produk, tapi bantu kamu ${escapeHtml(d.benefit)}.\n\n<strong>Benefit</strong>\nLebih hemat waktu, lebih gampang dipahami, dan enak dipakai buat kebutuhan harian.\n\n<strong>CTA</strong>\n${ctaLine(d.tujuan)}</div>`)).join('');
}
function ctaLine(goal) { return ({ 'Komen':'Komen MAU kalau pengen aku kirim detailnya.', 'DM':'Kalau mau tanya cocok atau nggak, DM aja ya.', 'Cek bio':'Cek bio ya, aku taruh aksesnya di sana.', 'Klik link':'Klik link yang aku taruh, pelan-pelan cek detailnya dulu.', 'Simpan postingan':'Simpan dulu biar gampang dicari pas butuh.' })[goal] || 'Kalau tertarik, kabarin aku ya.'; }
function ctas(d) { const groups = ['20 CTA komen','20 CTA DM','20 CTA cek bio','20 CTA soft selling','20 CTA urgent halus','20 CTA follow up']; const samples = ['komen MAU kalau pengen aku kirim detailnya', 'cek bio ya, aku taruh aksesnya di sana', 'kalau masih bingung mulai dari mana, boleh DM aja', 'simpan dulu biar nggak lupa', 'kalau cocok, boleh cek sekarang sebelum kelewat', 'aku bantu arahin yang paling pas buat kebutuhanmu']; return groups.map(g => section(g, list(Array.from({ length: 20 }, (_, i) => `${samples[i % samples.length]} — versi ${d.gaya || 'santai'} untuk ${d.platform || 'platform kamu'}.`)))).join(''); }
function scripts(d) { const durations = ['15 detik','30 detik','60 detik']; return durations.map(dur => section(`Script video ${dur}`, `<div class="caption-box"><strong>Scene 1: Hook</strong>\nVisual: close-up masalah / teks besar.\nOverlay: “Sering ${escapeHtml(d.masalah)}?”\nVO: “Kalau kamu ${escapeHtml(d.target)}, ini relate banget.”\n\n<strong>Scene 2: Masalah</strong>\nVisual: aktivitas yang bikin ribet.\nOverlay: “Masalah kecil, tapi ganggu.”\nVO: “Biasanya kelihatan sepele, tapi lama-lama bikin capek.”\n\n<strong>Scene 3: Solusi</strong>\nVisual: tampilkan ${escapeHtml(d.produk)}.\nOverlay: “Coba solusi ini.”\nVO: “Aku nemu ${escapeHtml(d.produk)} yang fokus bantu ${escapeHtml(d.benefit)}.”\n\n<strong>Scene 4: Benefit</strong>\nVisual: before-after / demo.\nOverlay: “Lebih praktis.”\nVO: “Yang enak, pemula juga bisa langsung paham cara pakainya.”\n\n<strong>Scene 5: CTA</strong>\nVisual: produk + pointer ke bio/komentar.\nOverlay: “Mau detail?”\nVO: “Komen INFO atau cek bio ya.”\n\nVersi tanpa wajah: pakai tangan, produk, dan teks overlay.\nVersi screen record: rekam halaman/detail produk.\nVersi foto produk: kombinasikan zoom, pan, dan teks.\nVersi stok video: gunakan footage aktivitas audiens + overlay benefit.</div>`)).join(''); }
function ideas(d) { const cats = ['Edukasi','Storytelling','Problem solution','Review','Comparison','Mistake','Tips','Before after','FAQ','Soft selling']; return section('30 ide konten harian', Array.from({ length: 30 }, (_, i) => { const cat = cats[i % cats.length]; return `<div class="item-card"><h4>Hari ke-${i + 1}: ${cat} ${escapeHtml(d.produk)}</h4><p><strong>Format:</strong> ${i % 3 === 0 ? 'Video pendek' : i % 3 === 1 ? 'Carousel' : 'Story/Threads'}</p><p><strong>Hook:</strong> Buat ${escapeHtml(d.target)} yang mau ${escapeHtml(d.tujuan)} tanpa bingung.</p><p><strong>Isi singkat:</strong> Bahas ${escapeHtml(d.niche)} dari sisi ${cat.toLowerCase()} dan kaitkan dengan kebutuhan audiens.</p><p><strong>CTA:</strong> Komen MAU kalau mau contoh detailnya.</p><p><strong>Catatan visual:</strong> Pakai demo, teks besar, dan contoh situasi sehari-hari.</p></div>`; }).join('')); }
function replies(d) { const groups = ['5 balasan singkat','5 balasan trust building','5 balasan closing halus','5 follow up setelah belum dibalas','5 follow up setelah tanya harga']; return groups.map(g => section(g, list(Array.from({ length: 5 }, (_, i) => `Boleh kak, untuk ${d.produk} aku bantu jelasin pelan-pelan ya. Kalau kondisinya ${d.kondisi.toLowerCase()}, menurutku cek dulu detail dan bukti yang tersedia biar lebih yakin. (${d.gaya}, opsi ${i + 1})`)))).join(''); }
function calculator(d) { const harga = +d.harga, pct = +d.komisi, sold = +d.terjual, target = +d.target, closing = +d.closing; const per = harga * pct / 100; const total = per * sold; const need = per ? Math.ceil(target / per) : 0; const traffic = closing ? Math.ceil(need / (closing / 100)) : 0; return section('Hasil kalkulator komisi', bullets([`Komisi per penjualan: ${rupiah(per)}`, `Total komisi: ${rupiah(total)}`, `Jumlah penjualan untuk capai target: ${need} penjualan`, `Estimasi traffic/leads yang dibutuhkan: ${traffic} orang dengan closing rate ${closing}%`, `Catatan: mulai dari target kecil dulu, tes hook berbeda, lalu scale konten yang paling banyak mendatangkan klik atau DM.`])); }

const promptData = [
  ['Prompt riset produk affiliate','Saat mau validasi produk sebelum dipromosikan','Bantu aku riset produk affiliate berikut. Analisis skor potensi 1-100, target audiens, pain point, benefit utama, angle konten, risiko, dan CTA. Produk: [isi]. Platform: [isi]. Target: [isi].'],
  ['Prompt cari angle produk','Saat konten terasa monoton','Buatkan angle promosi, edukasi, storytelling, soft selling, problem-solution, dan kontroversial halus untuk produk [produk], target [target], masalah [masalah], benefit [benefit].'],
  ['Prompt bikin hook','Saat butuh pembuka konten','Buat 50 hook natural untuk produk [produk]. Tone casual, tidak lebay, tidak menipu. Target [target], masalah [masalah], platform [platform].'],
  ['Prompt bikin caption','Saat posting butuh caption siap pakai','Buat caption pendek, medium, storytelling, edukasi, soft selling, Threads, TikTok/IG, WhatsApp, Telegram dengan format Hook-Body-Solusi-Benefit-CTA.'],
  ['Prompt bikin CTA','Saat bingung ajak audiens action','Buat CTA komen, DM, cek bio, soft selling, urgent halus, dan follow up. Jangan hard selling. Platform [platform], gaya [gaya].'],
  ['Prompt bikin script video','Saat mau rekam video pendek','Buat script video 15/30/60 detik untuk [produk]. Sertakan scene, visual, overlay, voice over, CTA, versi tanpa wajah, screen record, foto produk, dan stok video.'],
  ['Prompt balas DM','Saat calon pembeli tanya-tanya','Buat balasan DM natural untuk pertanyaan: [pertanyaan]. Produk [produk], kondisi [kondisi], gaya [gaya]. Jangan memaksa.'],
  ['Prompt edukasi produk','Saat perlu konten value','Buat konten edukasi yang menjelaskan masalah [masalah], kenapa terjadi, dan bagaimana [produk] membantu dengan bahasa pemula.'],
  ['Prompt ide konten 30 hari','Saat butuh kalender konten','Buat 30 ide konten harian untuk niche [niche], produk [produk], target [target], platform [platform], tujuan [tujuan]. Sertakan hook, isi, CTA, visual.'],
  ['Prompt evaluasi konten','Saat ingin improve performa','Evaluasi konten berikut dari sisi hook, retention, clarity, trust, CTA, dan risiko hard selling. Beri revisi yang lebih natural. Konten: [tempel].']
];

function renderPrompts() { $('#promptLibrary').innerHTML = promptData.map(([title, when, prompt]) => `<article class="prompt-card"><h3>${escapeHtml(title)}</h3><p><strong>Kapan dipakai:</strong> ${escapeHtml(when)}</p><div class="prompt-text">${escapeHtml(prompt)}</div><button class="btn secondary" data-copy-prompt type="button">Copy prompt</button></article>`).join(''); $$('[data-copy-prompt]').forEach(btn => btn.onclick = () => navigator.clipboard.writeText($('.prompt-text', btn.closest('.prompt-card')).innerText).then(() => toast('Prompt dicopy'))); }
function renderFeatures() { $('#featureGrid').innerHTML = featureList.map(([title, desc, target], i) => `<button class="feature-card" data-target="${target}" type="button"><div class="feature-icon">${i + 1}</div><h3>${title}</h3><p>${desc}</p></button>`).join(''); }
function renderHistory() { const listEl = $('#historyList'); const items = history(); if (!items.length) { listEl.innerHTML = '<div class="empty-output">Belum ada riwayat. Simpan hasil generate favoritmu di sini.</div>'; return; } listEl.innerHTML = items.map(it => `<article class="history-item" data-id="${it.id}"><div class="history-meta"><strong>${escapeHtml(it.tool)}</strong><span>${escapeHtml(it.product)}</span><span>${new Date(it.date).toLocaleString('id-ID')}</span></div><p>${escapeHtml(it.result).slice(0, 260)}${it.result.length > 260 ? '...' : ''}</p><div class="result-actions"><button class="btn secondary" data-copy-history type="button">Copy hasil</button><button class="btn ghost" data-export-history type="button">Export TXT</button><button class="btn danger" data-delete-history type="button">Hapus item</button></div></article>`).join(''); }
function navigate(id) { $$('.page-section').forEach(s => s.classList.toggle('active', s.id === id)); $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.target === id)); location.hash = id; window.scrollTo({ top: 0, behavior: 'smooth' }); }

function init() {
  renderFeatures(); renderPrompts(); renderHistory();
  if (localStorage.getItem(THEME_KEY) === 'dark') document.body.classList.add('dark');
  $$('.output').forEach(o => o.innerHTML = '<div class="empty-output">Isi form lalu klik generate. Hasil akan muncul rapi di sini dan bisa dicopy/export.</div>');
  document.addEventListener('click', e => { const t = e.target.closest('[data-target]'); if (t) navigate(t.dataset.target); });
  [$('#themeToggle'), $('#themeToggleMobile')].forEach(btn => btn && (btn.onclick = () => { document.body.classList.toggle('dark'); localStorage.setItem(THEME_KEY, document.body.classList.contains('dark') ? 'dark' : 'light'); }));
  $$('form[data-tool]').forEach(form => form.addEventListener('submit', e => { e.preventDefault(); const d = formData(form), tool = form.dataset.tool; const map = { riset: () => riset(d), angle: () => makeAngles(d), hook: () => hooks(d), caption: () => captions(d), cta: () => ctas(d), script: () => scripts(d), ide: () => ideas(d), reply: () => replies(d), kalkulator: () => calculator(d) }; renderOutput(tool, form.closest('.page-section').dataset.title, map[tool](), clean(d.produk || d.niche || d.tujuan)); }));
  $('#historyList').addEventListener('click', e => { const item = e.target.closest('.history-item'); if (!item) return; const data = history().find(h => h.id === item.dataset.id); if (!data) return; if (e.target.matches('[data-copy-history]')) navigator.clipboard.writeText(data.result).then(() => toast('Riwayat dicopy')); if (e.target.matches('[data-export-history]')) download(`riwayat-${data.tool}-${Date.now()}.txt`, data.result); if (e.target.matches('[data-delete-history]')) saveHistory(history().filter(h => h.id !== data.id)); });
  $('#clearHistory').onclick = () => { if (confirm('Hapus semua riwayat?')) saveHistory([]); };
  $('#exportJson').onclick = () => download('esenef17-affiliate-history.json', JSON.stringify(history(), null, 2), 'application/json');
  $('#exportAllTxt').onclick = () => download('esenef17-affiliate-history.txt', history().map(h => `# ${h.tool} - ${h.product}\n${new Date(h.date).toLocaleString('id-ID')}\n\n${h.result}`).join('\n\n---\n\n'));
  $('#importJson').onchange = async e => { const file = e.target.files[0]; if (!file) return; try { const imported = JSON.parse(await file.text()); if (!Array.isArray(imported)) throw new Error('format'); saveHistory([...imported, ...history()]); toast('Import berhasil'); } catch { toast('File JSON tidak valid'); } e.target.value = ''; };
  navigate(location.hash?.replace('#','') || 'dashboard');
}

document.addEventListener('DOMContentLoaded', init);
