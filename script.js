const THEME_KEY = 'esenef_tools_theme_v2';
const LAST_PACKAGE_KEY = 'esenef_tools_last_package_v2';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clean = value => String(value || '').trim();

const categoryData = {
  'Produk Digital': {
    people: ['pemula yang pengen mulai jualan dari HP', 'reseller digital yang belum punya produk sendiri', 'kreator konten kecil yang mau punya bahan jualan', 'ibu rumah tangga yang cari jualan fleksibel', 'pelajar yang pengen mulai jualan pelan-pelan'],
    pains: ['bingung mulai jualan', 'belum punya produk sendiri', 'takut harus bikin produk dari nol', 'bingung promosi tanpa kelihatan maksa', 'kebanyakan mikir sampai akhirnya ga posting'],
    angles: ['mulai dari HP', 'produk siap jual', 'hemat waktu', 'cocok pemula', 'tinggal promosi lebih rapi'],
    reason: 'orang tertarik karena mereka bisa mulai dari langkah yang lebih jelas, bukan harus bikin semuanya dari nol.',
    avoid: 'jangan jual dengan janji cepat kaya. Lebih aman tekankan “punya bahan jualan dulu, belajar promosi pelan-pelan”.'
  },
  'Affiliate Shopee': {
    people: ['pemula affiliate Shopee', 'orang yang sering scroll produk tapi bingung pilih yang mau dipromosikan', 'kreator konten jualan dari HP', 'ibu rumah tangga yang mau promosi barang harian', 'pelajar yang butuh ide konten simpel'],
    pains: ['bingung pilih produk yang relate', 'takut konten terlihat terlalu jualan', 'ga tahu angle review yang enak', 'bingung bikin CTA ke link', 'sering posting tapi minim klik'],
    angles: ['review pemakaian', 'barang murah tapi kepake', 'problem-solution harian', 'before-after sederhana', 'cek link tanpa maksa'],
    reason: 'orang tertarik karena produknya terasa dekat dengan kebutuhan harian dan bisa dicek langsung dari link.',
    avoid: 'jangan cuma tempel link dan bilang murah. Tunjukkan masalah kecil yang diselesaikan produknya.'
  },
  'TikTok Shop': {
    people: ['pemula affiliate TikTok', 'kreator video pendek', 'orang yang jualan dari HP', 'penonton yang suka review cepat', 'seller kecil yang butuh konten simpel'],
    pains: ['bingung bikin opening video', 'takut review terdengar lebay', 'ga tahu visual apa yang harus direkam', 'konten cepat dilewati', 'CTA terasa maksa'],
    angles: ['demo cepat', 'review jujur', 'visual sebelum-sesudah', 'masalah harian', 'keranjang tanpa hard selling'],
    reason: 'orang tertarik karena bisa lihat manfaatnya cepat lewat video pendek.',
    avoid: 'jangan terlalu banyak klaim. TikTok lebih enak kalau langsung tunjukkan bukti visual atau pemakaian.'
  },
  'Fashion': {
    people: ['cewek/cowok muda yang pengen outfit simpel', 'mahasiswa yang cari gaya rapi tapi murah', 'pekerja yang butuh outfit harian', 'hijabers yang suka mix and match', 'orang yang pengen kelihatan niat tanpa ribet'],
    pains: ['bingung outfit', 'pengen rapi tapi simpel', 'cari barang murah tapi kelihatan bagus', 'takut salah ukuran atau bahan', 'lemari penuh tapi tetap merasa ga punya baju'],
    angles: ['mix and match', 'outfit harian', 'murah tapi kepake', 'rapi tanpa ribet', 'satu item banyak gaya'],
    reason: 'orang tertarik karena bisa membayangkan produk ini dipakai di aktivitas harian mereka.',
    avoid: 'jangan cuma bilang bahannya bagus. Bantu audiens lihat cara pakai dan cocoknya buat momen apa.'
  },
  'Skincare': {
    people: ['remaja yang mulai peduli kulit', 'mahasiswa dengan budget terbatas', 'pekerja yang butuh skincare simpel', 'orang dengan kulit kusam atau berminyak', 'pemula yang takut salah produk'],
    pains: ['kulit kusam', 'minyak berlebih', 'jerawat datang-pergi', 'takut salah produk', 'bingung urutan pakai'],
    angles: ['review jujur', 'before-after realistis', 'solusi harian', 'harga worth it', 'pemakaian rutin yang gampang'],
    reason: 'orang tertarik karena skincare terasa personal dan mereka butuh rasa aman sebelum mencoba.',
    avoid: 'jangan klaim hasil instan atau berlebihan. Pakai bahasa realistis dan sarankan patch test bila perlu.'
  },
  'Alat Rumah': {
    people: ['ibu rumah tangga yang kerjaan rumahnya banyak', 'anak kos dengan ruang kecil', 'pekerja rantau yang butuh alat praktis', 'keluarga kecil yang mau rumah lebih rapi', 'orang yang suka solusi hemat tenaga'],
    pains: ['kerjaan rumah ribet', 'pengen hemat waktu', 'ruang kecil cepat berantakan', 'capek ngerjain hal berulang', 'butuh alat yang gampang dipakai'],
    angles: ['praktis', 'hemat tenaga', 'cocok rumah kecil', 'bikin hidup lebih gampang', 'demo sebelum-sesudah'],
    reason: 'orang tertarik karena manfaatnya bisa langsung kebayang di rutinitas rumah.',
    avoid: 'jangan cuma sebut fitur. Tunjukkan situasi rumah yang jadi lebih gampang setelah pakai produk.'
  },
  'Makanan': {
    people: ['anak kos yang butuh stok praktis', 'pekerja yang sering lapar di sela aktivitas', 'pelajar yang cari camilan hemat', 'keluarga yang butuh pilihan simpel', 'orang yang suka makanan enak tanpa ribet'],
    pains: ['lapar tapi malas keluar', 'pengen praktis', 'budget terbatas', 'butuh stok camilan', 'mau enak tapi ga ribet'],
    angles: ['solusi cepat', 'stok camilan', 'cocok buat aktivitas harian', 'hemat tapi tetap enak', 'teman kerja atau belajar'],
    reason: 'orang tertarik karena makanan mudah dibayangkan: kapan dimakan, rasanya seperti apa, dan cocok buat situasi apa.',
    avoid: 'jangan cuma bilang enak. Ceritakan momen makannya biar audiens langsung kebayang.'
  },
  'Lainnya': {
    people: ['pemula yang lagi cari produk untuk dipromosikan', 'orang yang jualan dari HP', 'kreator konten kecil', 'reseller yang butuh angle baru', 'calon pembeli yang butuh solusi praktis'],
    pains: ['bingung apakah produk ini cocok dijual', 'ga tahu harus ngomong ke siapa', 'takut promosi terlalu maksa', 'blank saat bikin konten', 'butuh alasan yang masuk akal buat membeli'],
    angles: ['masalah harian', 'solusi praktis', 'review jujur', 'pemula friendly', 'soft selling'],
    reason: 'orang tertarik kalau produk ini dikaitkan dengan masalah yang mereka rasakan sehari-hari.',
    avoid: 'jangan mulai dari fitur. Mulai dari masalah audiens, baru sambungkan ke manfaat produk.'
  }
};

const styleRules = {
  'Soft Selling': { tone: 'halus, pelan, dan tidak memaksa', cta: 'kalau mau cek detailnya, aku taruh linknya ya', intro: 'ini bukan tipe konten yang harus ngegas jualan.' },
  'Relate & Curhat': { tone: 'lebih seperti curhat teman', cta: 'kalau kamu relate, simpan dulu atau DM aja', intro: 'jujur, bagian paling susah itu seringnya bukan niat.' },
  'Edukasi': { tone: 'jelas, ringan, dan ngajarin tanpa menggurui', cta: 'simpan dulu biar gampang dicari pas butuh', intro: 'kadang kita perlu paham masalahnya dulu sebelum promosi.' },
  'Review Jujur': { tone: 'apa adanya, realistis, dan tetap sopan', cta: 'cek detailnya dulu, jangan buru-buru kalau belum cocok', intro: 'aku lebih suka bahas yang realistis daripada terlalu manis.' },
  'Viral Halus': { tone: 'pancing rasa penasaran tapi tetap wajar', cta: 'komen “MAU” kalau pengen aku spill detailnya', intro: 'ini yang sering bikin orang berhenti scroll sebentar.' }
};

const platformRules = {
  Threads: { format: 'teks pendek berasa ngobrol', visual: 'pakai kalimat pembuka yang kuat, lalu lanjut thread singkat', cta: 'balas “MAU” kalau mau detailnya' },
  TikTok: { format: 'video cepat dengan hook 2 detik pertama', visual: 'rekam tangan, layar HP, produk, atau before-after', cta: 'cek keranjang/link kalau mau lihat detailnya' },
  Instagram: { format: 'Reels atau carousel singkat', visual: 'pakai cover teks besar dan slide poin simpel', cta: 'simpan postingan ini atau DM kalau mau tanya' },
  WhatsApp: { format: 'status singkat yang terasa personal', visual: 'pakai foto produk + teks pendek', cta: 'chat aku kalau mau lihat detailnya' },
  'Shopee Video': { format: 'demo produk singkat dan jelas', visual: 'tunjukkan produk dipakai dari dekat', cta: 'cek produk di keranjang ya' }
};

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 1700);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function copyText(text, label = 'Berhasil dicopy') {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => toast(label));
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
  toast(label);
}

function inferType(productName, selectedType) {
  if (selectedType && selectedType !== 'Lainnya') return selectedType;
  const name = productName.toLowerCase();
  if (/ebook|template|preset|digital|kelas|course|produk siap jual|file|notion|canva/.test(name)) return 'Produk Digital';
  if (/sunscreen|serum|toner|moist|skincare|sabun|acne|jerawat|spf/.test(name)) return 'Skincare';
  if (/baju|celana|dress|hijab|tas|sepatu|kaos|outfit|jaket/.test(name)) return 'Fashion';
  if (/rice cooker|rak|pel|dapur|rumah|lampu|vacuum|alat/.test(name)) return 'Alat Rumah';
  if (/snack|makanan|kopi|camilan|mie|sambal|kue|minuman/.test(name)) return 'Makanan';
  return 'Lainnya';
}

function pick(list, index) {
  return list[index % list.length];
}

function sentenceCase(text) {
  const value = clean(text);
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

function getContext(formValues, variant = 'default') {
  const product = clean(formValues.productName) || 'produk ini';
  const inferredType = inferType(product, formValues.productType);
  const data = categoryData[inferredType] || categoryData.Lainnya;
  const platform = formValues.platform || 'Threads';
  let style = formValues.contentStyle || 'Soft Selling';
  if (variant === 'soft') style = 'Soft Selling';
  if (variant === 'relate') style = 'Relate & Curhat';
  if (variant === 'santai') style = 'Review Jujur';
  const styleData = styleRules[style];
  const platformData = platformRules[platform];
  const level = formValues.userLevel || 'Aku masih blank banget';
  return { product, inferredType, data, platform, style, styleData, platformData, level, variant };
}

function generatePackage(formValues, variant = 'default') {
  const ctx = getContext(formValues, variant);
  return {
    analysis: buildAnalysis(ctx),
    audience: buildAudience(ctx),
    angles: buildAngles(ctx),
    hooks: buildHooks(ctx),
    captions: buildCaptions(ctx),
    ctas: buildCtas(ctx),
    scripts: buildScripts(ctx),
    dm: buildDm(ctx),
    plan: buildPlan(ctx)
  };
}

function buildAnalysis(ctx) {
  const people = pick(ctx.data.people, 0);
  const pain = pick(ctx.data.pains, 0);
  const angle = pick(ctx.data.angles, ctx.variant === 'relate' ? 4 : 0);
  return {
    title: 'Analisis Produk Singkat',
    copyLabel: 'Copy Analisis',
    items: [
      `Produk ini cocok dijual ke ${people}.`,
      `Masalah utama audiensnya: ${pain}. Biasanya mereka bukan malas, tapi belum nemu langkah yang terasa gampang dimulai.`,
      `Alasan orang mungkin tertarik beli: ${ctx.data.reason}`,
      `Angle promosi terbaik: “${sentenceCase(angle)}”. Bukan sekadar nawarin ${ctx.product}, tapi bantu audiens merasa, “oh, ini bisa bantu aku mulai lebih rapi.”`,
      `Kesalahan promosi yang harus dihindari: ${ctx.data.avoid}`
    ]
  };
}

function buildAudience(ctx) {
  return {
    title: 'Target Audiens Otomatis',
    copyLabel: 'Copy Target Audiens',
    cards: [0, 1, 2].map(index => ({
      heading: `Target ${index + 1}: ${sentenceCase(pick(ctx.data.people, index))}`,
      lines: [
        `Masalah mereka: ${pick(ctx.data.pains, index)}.`,
        `Cara ngomong ke mereka: pakai bahasa yang dekat, contoh keseharian, dan jangan langsung ngejar closing. Mulai dari “aku paham kamu stuck di bagian ini”.`
      ]
    }))
  };
}

function buildAngles(ctx) {
  return {
    title: 'Angle Konten',
    copyLabel: 'Copy Angle',
    cards: ctx.data.angles.slice(0, 5).map((angle, index) => ({
      heading: `Angle: ${sentenceCase(angle)}`,
      lines: [
        `Kenapa kuat: karena angle ini nyambung dengan masalah “${pick(ctx.data.pains, index)}” dan terasa masuk akal untuk ${ctx.platform}.`,
        `Contoh pembuka: “${angleOpeners(ctx, angle, index)}”`
      ]
    }))
  };
}

function angleOpeners(ctx, angle, index) {
  const openers = [
    `banyak orang pengen mulai, tapi berhenti di bagian “mulainya dari mana?”`,
    `kadang masalahnya bukan ga mau beli, tapi belum lihat kenapa ${ctx.product} kepake buat hidup mereka`,
    `kalau tiap mau posting malah blank, berarti kamu butuh angle yang lebih dekat sama masalah audiens`,
    `jujur, promosi yang enak itu bukan yang paling heboh, tapi yang paling relate`,
    `sebelum nawarin ${ctx.product}, coba bahas dulu masalah kecil yang sering mereka rasakan`
  ];
  return openers[index] || `mulai dari angle ${angle}, jangan langsung hard selling`;
}

function buildHooks(ctx) {
  const product = ctx.product;
  const pain = pick(ctx.data.pains, 0);
  const hooks = [
    `jujur, banyak pemula bukan gagal karena malas. mereka cuma kebanyakan bingung duluan.`,
    `kadang yang bikin ga mulai jualan itu bukan modal, tapi ga tahu harus mulai dari mana.`,
    `kalau tiap mau posting malah blank, berarti masalahnya bukan di niat doang.`,
    `aku baru sadar, promosi ${product} ga harus selalu terdengar jualan banget.`,
    `banyak orang stuck di bagian kecil: ngerti produknya, tapi bingung ngomonginnya.`,
    `ini bukan buat yang pengen instan, tapi buat yang pengen mulai lebih rapi.`,
    `sebelum mikir closing, coba bikin orang merasa “ini masalah aku banget”.`,
    `kalau kamu sering ${pain}, konten pertamamu ga harus ribet.`,
    `cara paling aman promosi ${product}: mulai dari cerita masalah, bukan langsung nyuruh beli.`,
    `aku suka angle ini karena ga maksa orang beli, tapi bikin mereka ngerti kenapa produknya relevan.`
  ];
  return { title: 'Hook Siap Pakai', copyLabel: 'Copy Hook', list: adaptHooks(hooks, ctx) };
}

function adaptHooks(hooks, ctx) {
  if (ctx.variant === 'santai') return hooks.map(hook => hook.replace('jujur,', 'jujur ya,').replace('aku baru sadar', 'aku baru ngeh'));
  if (ctx.variant === 'soft') return hooks.map(hook => `${hook} pelan-pelan aja, ga perlu ngegas jualan.`);
  if (ctx.variant === 'relate') return hooks.map(hook => hook.replace('banyak orang', 'banyak pemula tuh').replace('kalau kamu', 'kalau kamu juga'));
  return hooks;
}

function buildCaptions(ctx) {
  const pain = pick(ctx.data.pains, 1);
  const angle = pick(ctx.data.angles, 0);
  const cta = ctx.styleData.cta;
  return {
    title: 'Caption Siap Posting',
    copyLabel: 'Copy Caption',
    cards: [
      {
        heading: 'Versi 1: Soft selling',
        text: `${ctx.styleData.intro}\n\nKalau kamu lagi promosi ${ctx.product}, coba jangan mulai dari “beli sekarang”. Mulai dari masalah yang paling dekat dulu: ${pain}.\n\nDari situ, ${ctx.product} bisa diposisikan sebagai jalan yang lebih rapi buat mulai. Bukan yang bikin semuanya instan, tapi bantu langkah awalnya terasa lebih jelas.\n\n${cta}.`
      },
      {
        heading: 'Versi 2: Storytelling / relate',
        text: `Pernah ga sih, udah punya niat jualan tapi pas mau posting malah blank?\n\nKadang bukan karena produknya jelek. Kita cuma belum nemu cara ngomong yang bikin orang merasa relate. Untuk ${ctx.product}, angle yang enak dipakai adalah “${angle}”.\n\nJadi kontennya ga perlu heboh. Cukup ceritain masalahnya, kasih konteks, baru arahkan ke produk.\n\nKalau kamu mau lihat detailnya, boleh DM atau cek link yang aku taruh.`
      },
      {
        heading: 'Versi 3: Edukasi singkat',
        text: `Sebelum promosi ${ctx.product}, coba jawab 3 hal dulu:\n\n1. Siapa yang paling butuh?\n2. Masalah apa yang lagi mereka rasakan?\n3. Kenapa produk ini bisa bantu mereka mulai lebih gampang?\n\nKalau jawabannya sudah jelas, caption jadi lebih natural dan CTA ga terasa maksa.\n\nSimpan dulu kalau kamu sering bingung mulai dari mana.`
      }
    ]
  };
}

function buildCtas(ctx) {
  const ctas = [
    `komen “MAU” nanti aku spill isinya`,
    `kalau mau mulai tanpa ribet bikin dari nol, cek link di bio`,
    `DM aja kalau mau lihat detail paketnya`,
    `simpan dulu, siapa tahu nanti kamu butuh pas mulai jualan`,
    `kalau masih bingung cocok atau enggak, tanya aja dulu`,
    `aku taruh detailnya di bio, cek pelan-pelan ya`,
    `mau aku kirim contoh pemakaiannya? komen “CONTOH”`,
    `kalau kamu relate sama masalah ini, boleh cek detailnya dulu`,
    `ga harus beli sekarang, tapi boleh simpan dulu biar ga lupa`,
    `kalau mau versi yang paling cocok buat pemula, DM aku ya`
  ];
  return { title: 'CTA Siap Pakai', copyLabel: 'Copy CTA', list: ctas.map(cta => ctx.platform === 'WhatsApp' ? cta.replace('link di bio', 'chat ini').replace('di bio', 'di chat') : cta) };
}

function buildScripts(ctx) {
  const scripts = [
    {
      heading: 'Script 1: Problem dulu baru produk',
      text: `Opening: “kalau kamu sering bingung mau promosi ${ctx.product} dari mana, mulai dari sini dulu.”\nIsi: bahas satu masalah audiens: ${pick(ctx.data.pains, 0)}. Lalu jelaskan kenapa angle “${pick(ctx.data.angles, 0)}” lebih enak daripada langsung jualan.\nClosing: “kalau mau detailnya, cek link atau DM aja ya.”\nTeks layar: “jangan mulai dari jualan, mulai dari masalah”\nIde visual: ${ctx.platformData.visual}.`
    },
    {
      heading: 'Script 2: Relate pemula',
      text: `Opening: “jujur, banyak pemula stuck bukan karena malas.”\nIsi: ceritakan mereka sudah niat jualan, tapi blank pas bikin konten. Masukkan ${ctx.product} sebagai pilihan yang bikin langkah awal lebih rapi.\nClosing: “simpan dulu kalau kamu lagi di fase ini.”\nTeks layar: “yang bikin stuck: bingung mulai”\nIde visual: rekam layar catatan ide konten, lalu tampilkan produk/detail singkat.`
    },
    {
      heading: 'Script 3: Review halus',
      text: `Opening: “aku ga mau bilang ini wajib buat semua orang, tapi buat tipe ini lumayan kepake.”\nIsi: sebut siapa yang cocok: ${pick(ctx.data.people, 0)}. Jelaskan benefit tanpa klaim berlebihan dan tunjukkan cara pakainya.\nClosing: “cek detailnya dulu, kalau cocok baru lanjut.”\nTeks layar: “cocok kalau kamu butuh yang lebih praktis”\nIde visual: demo singkat, close-up produk, atau screen record detail produk.`
    }
  ];
  return { title: 'Script Video Pendek', copyLabel: 'Copy Script', cards: scripts };
}

function buildDm(ctx) {
  const product = ctx.product;
  return {
    title: 'Balasan DM Calon Pembeli',
    copyLabel: 'Copy DM',
    cards: [
      { heading: 'Tanya: “ini isinya apa?”', text: `Isinya detail tentang ${product} ya. Aku jelasin singkat: ini dibuat buat bantu kamu mulai lebih rapi, jadi kamu ga perlu nebak-nebak dari nol. Kalau mau, aku bisa kirim poin isinya satu-satu.` },
      { heading: 'Tanya: “cocok buat pemula ga?”', text: `Cocok, apalagi kalau kamu masih sering bingung mulai dari mana. Tapi tetap pelan-pelan ya, ini bukan yang bikin hasil instan. Lebih ke bantu kamu punya arah dan bahan promosi yang lebih jelas.` },
      { heading: 'Tanya: “bisa dijual ulang ga?”', text: `Tergantung ketentuan produknya ya. Kalau memang ada izin jual ulang/reseller, nanti biasanya aku jelasin batas pakainya juga biar aman dan ga salah promosi.` },
      { heading: 'Bilang: “mahal”', text: `Paham kok. Kalau dilihat sekilas mungkin terasa lumayan. Coba cek dulu isinya dan kamu bandingin sama waktu yang bisa dihemat. Kalau belum cocok sekarang juga gapapa banget.` },
      { heading: 'Bilang: “nanti dulu”', text: `Aman, ga perlu buru-buru. Aku kirim detailnya dulu aja ya, nanti kalau kamu udah siap mulai atau mau tanya-tanya, tinggal chat lagi.` }
    ]
  };
}

function buildPlan(ctx) {
  const product = ctx.product;
  const plan = [
    ['Hari 1: Edukasi masalah', `Bahas kenapa ${pick(ctx.data.pains, 0)} sering bikin orang ga mulai.`, `banyak pemula tuh bukan ga niat, tapi belum tahu langkah pertamanya.`, `simpan dulu kalau kamu sering ngerasa begini.`],
    ['Hari 2: Konten relate', `Ceritakan momen saat mau posting tapi blank, lalu sambungkan ke ${product}.`, `kalau tiap mau promosi malah mikir kelamaan, kamu ga sendirian.`, `komen “RELATE” kalau pernah ngalamin.`],
    ['Hari 3: Soft selling', `Kenalkan ${product} sebagai alat bantu, bukan jalan instan.`, `ini bukan buat yang pengen instan, tapi buat yang mau mulai lebih rapi.`, ctx.styleData.cta],
    ['Hari 4: Bukti/manfaat', `Tunjukkan manfaat, isi, demo, before-after, atau contoh pemakaian.`, `yang bikin produk lebih gampang dipahami itu bukan klaim, tapi contoh.`, `DM kalau mau lihat detail contohnya.`],
    ['Hari 5: Closing/CTA', `Rangkum siapa yang cocok, masalah yang dibantu, dan ajakan action halus.`, `kalau kamu lagi di fase pengen mulai tapi masih muter-muter, ini bisa jadi langkah awal.`, `cek link/detailnya dulu, kalau cocok baru ambil.`]
  ];
  return {
    title: 'Rencana Posting 5 Hari',
    copyLabel: 'Copy Rencana Posting',
    cards: plan.map(([heading, idea, hook, cta]) => ({ heading, lines: [`Tema konten: ${heading.split(': ')[1]}`, `Ide posting: ${idea}`, `Hook: “${hook}”`, `CTA: ${cta}`] }))
  };
}

function itemToText(item) {
  if (item.items) return item.items.join('\n');
  if (item.list) return item.list.map((value, index) => `${index + 1}. ${value}`).join('\n');
  if (item.cards) return item.cards.map(card => `${card.heading}\n${card.text || card.lines.join('\n')}`).join('\n\n');
  return '';
}

function renderList(item) {
  if (item.items) return `<ul>${item.items.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`;
  if (item.list) return `<ol>${item.list.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ol>`;
  return '';
}

function renderCards(item) {
  if (!item.cards) return '';
  return `<div class="strategy-list">${item.cards.map(card => `<article class="strategy-item"><strong>${escapeHtml(card.heading)}</strong>${card.text ? `<p class="caption-box">${escapeHtml(card.text)}</p>` : `<ul>${card.lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`}</article>`).join('')}</div>`;
}

function renderResults(packageData) {
  const grid = $('#resultGrid');
  const sections = ['analysis', 'audience', 'angles', 'hooks', 'captions', 'ctas', 'scripts', 'dm', 'plan'].map(key => packageData[key]);
  grid.innerHTML = sections.map(section => {
    const plain = itemToText(section);
    return `<article class="result-card"><div class="result-card-header"><h3>${escapeHtml(section.title)}</h3><button class="btn secondary copy-section" type="button" data-copy="${escapeHtml(plain)}">${escapeHtml(section.copyLabel)}</button></div><div class="content-block">${renderList(section)}${renderCards(section)}</div></article>`;
  }).join('');
  $$('.copy-section', grid).forEach(button => button.addEventListener('click', () => copyText(button.dataset.copy, `${button.textContent} berhasil`)));
}

function getFormValues() {
  return Object.fromEntries(new FormData($('#promoForm')).entries());
}

function setLoading(isLoading) {
  $('#loadingState').hidden = !isLoading;
  $('#emptyState').hidden = isLoading || $('#resultGrid').children.length > 0;
  $('#generateBtn').disabled = isLoading;
  $('#generateBtn').textContent = isLoading ? 'Lagi mikirin strateginya...' : 'Generate Paket Promosi';
}

function runGenerate(variant = 'default') {
  const form = $('#promoForm');
  if (!form.reportValidity()) return;
  const values = getFormValues();
  setLoading(true);
  $('#resultGrid').innerHTML = '';
  $('#globalActions').hidden = true;
  setTimeout(() => {
    const packageData = generatePackage(values, variant);
    renderResults(packageData);
    const allText = Object.values(packageData).map(item => `# ${item.title}\n${itemToText(item)}`).join('\n\n---\n\n');
    $('#copyAllBtn').onclick = () => copyText(allText, 'Semua paket berhasil dicopy');
    localStorage.setItem(LAST_PACKAGE_KEY, JSON.stringify({ values, variant, generatedAt: new Date().toISOString(), allText }));
    $('#globalActions').hidden = false;
    $('#loadingState').hidden = true;
    $('#emptyState').hidden = true;
    $('#generateBtn').disabled = false;
    $('#generateBtn').textContent = 'Generate Paket Promosi';
    $('#outputTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 520);
}

function initTheme() {
  if (localStorage.getItem(THEME_KEY) === 'dark') document.body.classList.add('dark');
  $('#themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

function init() {
  initTheme();
  $('#promoForm').addEventListener('submit', event => {
    event.preventDefault();
    runGenerate('default');
  });
  $$('[data-regenerate]').forEach(button => button.addEventListener('click', () => runGenerate(button.dataset.regenerate)));
}

document.addEventListener('DOMContentLoaded', init);
