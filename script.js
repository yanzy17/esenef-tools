const THEME_KEY = 'esenef_tools_theme_clean_v1';
const LAST_PACKAGE_KEY = 'esenef_tools_last_package_clean_v1';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clean = value => String(value || '').trim();

const categoryRules = {
  'Produk Digital': {
    target: ['pemula yang pengen mulai jualan dari HP', 'reseller digital yang belum punya produk sendiri', 'kreator konten kecil yang butuh bahan jualan', 'ibu rumah tangga yang cari jualan fleksibel', 'pelajar yang mau mulai pelan-pelan'],
    pain: ['bingung mulai jualan', 'belum punya produk sendiri', 'takut harus bikin produk dari nol', 'bingung promosi tanpa kelihatan maksa', 'kebanyakan mikir sampai akhirnya ga posting'],
    angle: ['mulai dari HP', 'produk siap jual', 'hemat waktu', 'cocok pemula', 'tinggal promosi lebih rapi'],
    benefit: 'mereka bisa punya bahan jualan lebih cepat dan belajar promosi tanpa harus bikin semuanya dari nol',
    avoid: 'jangan pakai janji cepat kaya. Lebih aman tekankan mulai lebih rapi, punya bahan jualan, dan belajar konsisten.'
  },
  'Affiliate Shopee': {
    target: ['pemula affiliate Shopee', 'orang yang suka review barang harian', 'kreator konten jualan dari HP', 'ibu rumah tangga yang promosi barang kepake', 'pelajar yang cari ide konten simpel'],
    pain: ['bingung pilih produk yang relate', 'takut konten terlihat terlalu jualan', 'ga tahu angle review yang enak', 'bingung bikin CTA ke link', 'posting tapi minim klik'],
    angle: ['review pemakaian', 'barang murah tapi kepake', 'problem-solution harian', 'before-after sederhana', 'cek link tanpa maksa'],
    benefit: 'produknya bisa dikaitkan dengan masalah harian, jadi audiens lebih gampang paham kenapa barang itu berguna',
    avoid: 'jangan cuma tempel link dan bilang murah. Tunjukkan masalah kecil yang diselesaikan produknya.'
  },
  'TikTok Shop': {
    target: ['pemula affiliate TikTok', 'kreator video pendek', 'seller kecil yang butuh konten simpel', 'orang yang jualan dari HP', 'penonton yang suka review cepat'],
    pain: ['bingung bikin opening video', 'takut review terdengar lebay', 'ga tahu visual apa yang harus direkam', 'konten cepat dilewati', 'CTA terasa maksa'],
    angle: ['demo cepat', 'review jujur', 'visual sebelum-sesudah', 'masalah harian', 'keranjang tanpa hard selling'],
    benefit: 'orang bisa melihat manfaatnya cepat lewat visual singkat, bukan cuma membaca klaim',
    avoid: 'jangan terlalu banyak klaim. Tunjukkan demo, tekstur, isi, ukuran, atau cara pakai.'
  },
  Fashion: {
    target: ['mahasiswa yang pengen outfit simpel', 'pekerja yang butuh gaya rapi harian', 'hijabers yang suka mix and match', 'cewek/cowok muda yang cari barang kepake', 'orang yang pengen kelihatan niat tanpa ribet'],
    pain: ['bingung outfit', 'pengen rapi tapi simpel', 'cari barang murah tapi kelihatan bagus', 'takut salah ukuran atau bahan', 'lemari penuh tapi tetap merasa ga punya baju'],
    angle: ['mix and match', 'outfit harian', 'murah tapi kepake', 'rapi tanpa ribet', 'satu item banyak gaya'],
    benefit: 'audiens bisa langsung membayangkan produk ini dipakai untuk aktivitas harian mereka',
    avoid: 'jangan cuma bilang bahannya bagus. Tunjukkan dipakai untuk momen apa dan cocok dipadukan dengan apa.'
  },
  Skincare: {
    target: ['remaja yang mulai peduli kulit', 'mahasiswa dengan budget terbatas', 'pekerja yang butuh skincare simpel', 'orang dengan kulit kusam atau berminyak', 'pemula yang takut salah produk'],
    pain: ['kulit kusam', 'minyak berlebih', 'jerawat datang-pergi', 'takut salah produk', 'bingung urutan pakai'],
    angle: ['review jujur', 'before-after realistis', 'solusi harian', 'harga worth it', 'pemakaian rutin yang gampang'],
    benefit: 'audiens butuh rasa aman dan penjelasan realistis sebelum mencoba produk baru',
    avoid: 'jangan klaim hasil instan atau berlebihan. Pakai bahasa realistis dan ingatkan untuk cek kecocokan kulit.'
  },
  'Alat Rumah': {
    target: ['ibu rumah tangga yang kerjaan rumahnya banyak', 'anak kos dengan ruang kecil', 'pekerja rantau yang butuh alat praktis', 'keluarga kecil yang mau rumah lebih rapi', 'orang yang suka solusi hemat tenaga'],
    pain: ['kerjaan rumah ribet', 'pengen hemat waktu', 'ruang kecil cepat berantakan', 'capek ngerjain hal berulang', 'butuh alat yang gampang dipakai'],
    angle: ['praktis', 'hemat tenaga', 'cocok rumah kecil', 'bikin hidup lebih gampang', 'demo sebelum-sesudah'],
    benefit: 'manfaatnya bisa langsung kebayang di rutinitas rumah, apalagi kalau ditunjukkan lewat demo',
    avoid: 'jangan cuma sebut fitur. Tunjukkan situasi rumah yang jadi lebih gampang setelah pakai produk.'
  },
  Makanan: {
    target: ['anak kos yang butuh stok praktis', 'pekerja yang sering lapar di sela aktivitas', 'pelajar yang cari camilan hemat', 'keluarga yang butuh pilihan simpel', 'orang yang suka makanan enak tanpa ribet'],
    pain: ['lapar tapi malas keluar', 'pengen praktis', 'budget terbatas', 'butuh stok camilan', 'mau enak tapi ga ribet'],
    angle: ['solusi cepat', 'stok camilan', 'cocok buat aktivitas harian', 'hemat tapi tetap enak', 'teman kerja atau belajar'],
    benefit: 'orang mudah tertarik kalau mereka bisa membayangkan momen makan, rasa, dan situasi pakainya',
    avoid: 'jangan cuma bilang enak. Ceritakan kapan cocok dimakan dan kenapa praktis.'
  },
  Lainnya: {
    target: ['pemula yang lagi cari produk untuk dipromosikan', 'orang yang jualan dari HP', 'kreator konten kecil', 'reseller yang butuh angle baru', 'calon pembeli yang butuh solusi praktis'],
    pain: ['bingung apakah produk ini cocok dijual', 'ga tahu harus ngomong ke siapa', 'takut promosi terlalu maksa', 'blank saat bikin konten', 'butuh alasan yang masuk akal buat membeli'],
    angle: ['masalah harian', 'solusi praktis', 'review jujur', 'pemula friendly', 'soft selling'],
    benefit: 'produk terasa lebih menarik kalau dikaitkan dengan masalah yang audiens rasakan sehari-hari',
    avoid: 'jangan mulai dari fitur. Mulai dari masalah audiens, baru sambungkan ke manfaat produk.'
  }
};

const styleRules = {
  'Soft Selling': { intro: 'pelan-pelan aja, ga perlu ngegas jualan', cta: 'kalau mau cek detailnya, aku taruh linknya ya' },
  'Relate & Curhat': { intro: 'jujur, bagian paling susah seringnya bukan niat', cta: 'kalau kamu relate, simpan dulu atau DM aja' },
  Edukasi: { intro: 'kadang kita perlu paham masalahnya dulu sebelum promosi', cta: 'simpan dulu biar gampang dicari pas butuh' },
  'Review Jujur': { intro: 'bahas yang realistis aja, ga perlu terlalu manis', cta: 'cek detailnya dulu, jangan buru-buru kalau belum cocok' },
  'Viral Halus': { intro: 'ini angle yang bisa bikin orang berhenti scroll sebentar', cta: 'komen “MAU” kalau pengen aku spill detailnya' }
};

const platformRules = {
  Threads: { channel: 'teks pendek yang berasa ngobrol', visual: 'tulis hook kuat di baris pertama, lanjutkan dengan 2–3 paragraf pendek', cta: 'balas “MAU” kalau mau detailnya' },
  TikTok: { channel: 'video cepat dengan hook di 2 detik pertama', visual: 'rekam tangan, layar HP, produk, atau before-after sederhana', cta: 'cek keranjang/link kalau mau lihat detailnya' },
  Instagram: { channel: 'Reels atau carousel singkat', visual: 'pakai cover teks besar, slide sederhana, dan contoh situasi harian', cta: 'simpan postingan ini atau DM kalau mau tanya' },
  WhatsApp: { channel: 'status singkat yang terasa personal', visual: 'pakai foto produk dan teks pendek yang gampang dibaca', cta: 'chat aku kalau mau lihat detailnya' },
  'Shopee Video': { channel: 'demo produk singkat dan jelas', visual: 'tunjukkan produk dari dekat, cara pakai, dan manfaat utama', cta: 'cek produk di keranjang ya' }
};

function inferProductType(productName, selectedType) {
  if (selectedType && selectedType !== 'auto' && selectedType !== 'Lainnya') return selectedType;
  const name = productName.toLowerCase();
  if (/ebook|template|digital|kelas|course|produk siap jual|file|notion|canva|preset|reseller/.test(name)) return 'Produk Digital';
  if (/sunscreen|serum|toner|moist|skincare|sabun|acne|jerawat|spf|cream/.test(name)) return 'Skincare';
  if (/baju|celana|dress|hijab|tas|sepatu|kaos|outfit|jaket|kemeja/.test(name)) return 'Fashion';
  if (/rice cooker|rak|pel|dapur|rumah|lampu|vacuum|alat|kompor|panci/.test(name)) return 'Alat Rumah';
  if (/snack|makanan|kopi|camilan|mie|sambal|kue|minuman|cookies/.test(name)) return 'Makanan';
  return selectedType === 'Lainnya' ? 'Lainnya' : 'Produk Digital';
}

function getContext(values, variant = 'default') {
  const product = clean(values.productName) || 'produk ini';
  const inferredType = inferProductType(product, values.productType);
  const productData = categoryRules[inferredType] || categoryRules.Lainnya;
  const platform = values.platform || 'Threads';
  let contentStyle = values.contentStyle || 'Soft Selling';
  if (variant === 'santai') contentStyle = 'Review Jujur';
  if (variant === 'soft') contentStyle = 'Soft Selling';
  if (variant === 'relate') contentStyle = 'Relate & Curhat';
  return {
    product,
    inferredType,
    productData,
    platform,
    platformData: platformRules[platform],
    contentStyle,
    styleData: styleRules[contentStyle],
    userLevel: values.userLevel || 'Aku masih blank banget',
    variant
  };
}

function pick(list, index) {
  return list[index % list.length];
}

function titleCase(text) {
  const value = clean(text);
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

function generatePackage(values, variant = 'default') {
  const ctx = getContext(values, variant);
  return [
    buildAnalysis(ctx),
    buildAudience(ctx),
    buildAngles(ctx),
    buildHooks(ctx),
    buildCaptions(ctx),
    buildCtas(ctx),
    buildScripts(ctx),
    buildDmReplies(ctx),
    buildPostingPlan(ctx)
  ];
}

function buildAnalysis(ctx) {
  return {
    id: 'analysis',
    title: 'Analisis Produk Singkat',
    copyLabel: 'Copy Analisis',
    type: 'list',
    items: [
      `Produk ini cocok dijual ke ${pick(ctx.productData.target, 0)}.`,
      `Masalah utama audiens: ${pick(ctx.productData.pain, 0)}. Biasanya mereka bukan malas, tapi belum nemu langkah yang terasa gampang dimulai.`,
      `Alasan orang mungkin tertarik beli: ${ctx.productData.benefit}.`,
      `Angle promosi terbaik: “${titleCase(pick(ctx.productData.angle, 0))}”. Bukan sekadar nawarin ${ctx.product}, tapi bantu audiens merasa “oh, ini bisa bantu aku mulai lebih rapi”.`,
      `Kesalahan yang harus dihindari: ${ctx.productData.avoid}`
    ]
  };
}

function buildAudience(ctx) {
  return {
    id: 'audience',
    title: 'Target Audiens Otomatis',
    copyLabel: 'Copy Target Audiens',
    type: 'cards',
    cards: [0, 1, 2].map(index => ({
      heading: `Target ${index + 1}: ${titleCase(pick(ctx.productData.target, index))}`,
      lines: [
        `Masalah mereka: ${pick(ctx.productData.pain, index)}.`,
        `Cara ngomong ke mereka: pakai contoh keseharian, jangan langsung ngejar closing, dan mulai dari kalimat yang bikin mereka merasa dipahami.`
      ]
    }))
  };
}

function buildAngles(ctx) {
  return {
    id: 'angles',
    title: 'Angle Konten',
    copyLabel: 'Copy Angle',
    type: 'cards',
    cards: ctx.productData.angle.slice(0, 5).map((angle, index) => ({
      heading: `Angle: ${titleCase(angle)}`,
      lines: [
        `Kenapa kuat: nyambung dengan masalah “${pick(ctx.productData.pain, index)}” dan cocok untuk format ${ctx.platformData.channel}.`,
        `Contoh pembuka: “${angleOpener(ctx, index)}”`
      ]
    }))
  };
}

function angleOpener(ctx, index) {
  const openers = [
    `banyak orang pengen mulai, tapi berhenti di bagian “mulainya dari mana?”`,
    `kadang masalahnya bukan ga butuh, tapi belum kebayang kenapa ${ctx.product} relevan buat mereka`,
    `kalau tiap mau posting malah blank, berarti kamu butuh angle yang lebih dekat sama masalah audiens`,
    `promosi yang enak itu bukan yang paling heboh, tapi yang paling relate`,
    `sebelum nawarin ${ctx.product}, coba bahas dulu masalah kecil yang sering mereka rasakan`
  ];
  return openers[index];
}

function buildHooks(ctx) {
  const pain = pick(ctx.productData.pain, 0);
  const hooks = [
    'jujur, banyak pemula bukan gagal karena malas. mereka cuma kebanyakan bingung duluan.',
    'kadang yang bikin ga mulai jualan itu bukan modal, tapi ga tahu harus mulai dari mana.',
    'kalau tiap mau posting malah blank, berarti masalahnya bukan di niat doang.',
    `aku baru ngeh, promosi ${ctx.product} ga harus selalu terdengar jualan banget.`,
    'banyak orang stuck di bagian kecil: ngerti produknya, tapi bingung ngomonginnya.',
    'ini bukan buat yang pengen instan, tapi buat yang pengen mulai lebih rapi.',
    'sebelum mikir closing, coba bikin orang merasa “ini masalah aku banget”.',
    `kalau kamu sering ${pain}, konten pertamamu ga harus ribet.`,
    `cara paling aman promosi ${ctx.product}: mulai dari cerita masalah, bukan langsung nyuruh beli.`,
    'angle yang bagus itu ga maksa orang beli, tapi bikin mereka paham kenapa produknya kepake.'
  ];
  return { id: 'hooks', title: 'Hook Siap Pakai', copyLabel: 'Copy Hook', type: 'ordered', items: adaptByVariant(hooks, ctx.variant) };
}

function adaptByVariant(items, variant) {
  if (variant === 'santai') return items.map(item => item.replace('jujur,', 'jujur ya,').replace('aku baru ngeh', 'aku baru sadar'));
  if (variant === 'soft') return items.map(item => `${item} pelan-pelan aja, ga perlu ngegas jualan.`);
  if (variant === 'relate') return items.map(item => item.replace('banyak orang', 'banyak pemula tuh').replace('kalau kamu', 'kalau kamu juga'));
  return items;
}

function buildCaptions(ctx) {
  const pain = pick(ctx.productData.pain, 1);
  const angle = pick(ctx.productData.angle, 0);
  return {
    id: 'captions',
    title: 'Caption Siap Posting',
    copyLabel: 'Copy Caption',
    type: 'cards',
    cards: [
      {
        heading: 'Versi 1: Soft selling',
        text: `${ctx.styleData.intro}.\n\nKalau kamu lagi promosi ${ctx.product}, coba jangan mulai dari “beli sekarang”. Mulai dari masalah yang paling dekat dulu: ${pain}.\n\nDari situ, ${ctx.product} bisa diposisikan sebagai jalan yang lebih rapi buat mulai. Bukan yang bikin semuanya instan, tapi bantu langkah awalnya terasa lebih jelas.\n\n${ctx.styleData.cta}.`
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
  const base = [
    'komen “MAU” nanti aku spill isinya',
    'kalau mau mulai tanpa ribet bikin dari nol, cek link di bio',
    'DM aja kalau mau lihat detail paketnya',
    'simpan dulu, siapa tahu nanti kamu butuh pas mulai jualan',
    'kalau masih bingung cocok atau enggak, tanya aja dulu',
    'aku taruh detailnya di bio, cek pelan-pelan ya',
    'mau aku kirim contoh pemakaiannya? komen “CONTOH”',
    'kalau kamu relate sama masalah ini, boleh cek detailnya dulu',
    'ga harus beli sekarang, tapi boleh simpan dulu biar ga lupa',
    'kalau mau versi yang paling cocok buat pemula, DM aku ya'
  ];
  const items = ctx.platform === 'WhatsApp'
    ? base.map(item => item.replace('link di bio', 'chat ini').replace('di bio', 'di chat').replace('komen “MAU”', 'chat “MAU”'))
    : base;
  return { id: 'ctas', title: 'CTA Siap Pakai', copyLabel: 'Copy CTA', type: 'ordered', items };
}

function buildScripts(ctx) {
  return {
    id: 'scripts',
    title: 'Script Video Pendek',
    copyLabel: 'Copy Script',
    type: 'cards',
    cards: [
      {
        heading: 'Script 1: Problem dulu baru produk',
        text: `Opening: “kalau kamu sering bingung mau promosi ${ctx.product} dari mana, mulai dari sini dulu.”\nIsi: bahas satu masalah audiens: ${pick(ctx.productData.pain, 0)}. Lalu jelaskan kenapa angle “${pick(ctx.productData.angle, 0)}” lebih enak daripada langsung jualan.\nClosing: “kalau mau detailnya, cek link atau DM aja ya.”\nTeks layar: “jangan mulai dari jualan, mulai dari masalah”\nIde visual: ${ctx.platformData.visual}.`
      },
      {
        heading: 'Script 2: Relate pemula',
        text: `Opening: “jujur, banyak pemula stuck bukan karena malas.”\nIsi: ceritakan mereka sudah niat jualan, tapi blank pas bikin konten. Masukkan ${ctx.product} sebagai pilihan yang bikin langkah awal lebih rapi.\nClosing: “simpan dulu kalau kamu lagi di fase ini.”\nTeks layar: “yang bikin stuck: bingung mulai”\nIde visual: rekam layar catatan ide konten, lalu tampilkan produk/detail singkat.`
      },
      {
        heading: 'Script 3: Review halus',
        text: `Opening: “aku ga mau bilang ini wajib buat semua orang, tapi buat tipe ini lumayan kepake.”\nIsi: sebut siapa yang cocok: ${pick(ctx.productData.target, 0)}. Jelaskan benefit tanpa klaim berlebihan dan tunjukkan cara pakainya.\nClosing: “cek detailnya dulu, kalau cocok baru lanjut.”\nTeks layar: “cocok kalau kamu butuh yang lebih praktis”\nIde visual: demo singkat, close-up produk, atau screen record detail produk.`
      }
    ]
  };
}

function buildDmReplies(ctx) {
  return {
    id: 'dm',
    title: 'Balasan DM Calon Pembeli',
    copyLabel: 'Copy DM',
    type: 'cards',
    cards: [
      { heading: 'Tanya: “ini isinya apa?”', text: `Isinya detail tentang ${ctx.product} ya. Aku jelasin singkat: ini dibuat buat bantu kamu mulai lebih rapi, jadi kamu ga perlu nebak-nebak dari nol. Kalau mau, aku bisa kirim poin isinya satu-satu.` },
      { heading: 'Tanya: “cocok buat pemula ga?”', text: 'Cocok, apalagi kalau kamu masih sering bingung mulai dari mana. Tapi tetap pelan-pelan ya, ini bukan yang bikin hasil instan. Lebih ke bantu kamu punya arah dan bahan promosi yang lebih jelas.' },
      { heading: 'Tanya: “bisa dijual ulang ga?”', text: 'Tergantung ketentuan produknya ya. Kalau memang ada izin jual ulang/reseller, nanti biasanya aku jelasin batas pakainya juga biar aman dan ga salah promosi.' },
      { heading: 'Bilang: “mahal”', text: 'Paham kok. Kalau dilihat sekilas mungkin terasa lumayan. Coba cek dulu isinya dan kamu bandingin sama waktu yang bisa dihemat. Kalau belum cocok sekarang juga gapapa banget.' },
      { heading: 'Bilang: “nanti dulu”', text: 'Aman, ga perlu buru-buru. Aku kirim detailnya dulu aja ya, nanti kalau kamu udah siap mulai atau mau tanya-tanya, tinggal chat lagi.' }
    ]
  };
}

function buildPostingPlan(ctx) {
  const product = ctx.product;
  const plan = [
    ['Hari 1: Edukasi masalah', `Bahas kenapa ${pick(ctx.productData.pain, 0)} sering bikin orang ga mulai.`, 'banyak pemula tuh bukan ga niat, tapi belum tahu langkah pertamanya.', 'simpan dulu kalau kamu sering ngerasa begini.'],
    ['Hari 2: Konten relate', `Ceritakan momen saat mau posting tapi blank, lalu sambungkan ke ${product}.`, 'kalau tiap mau promosi malah mikir kelamaan, kamu ga sendirian.', 'komen “RELATE” kalau pernah ngalamin.'],
    ['Hari 3: Soft selling', `Kenalkan ${product} sebagai alat bantu, bukan jalan instan.`, 'ini bukan buat yang pengen instan, tapi buat yang mau mulai lebih rapi.', ctx.styleData.cta],
    ['Hari 4: Bukti/manfaat', 'Tunjukkan manfaat, isi, demo, before-after, atau contoh pemakaian.', 'yang bikin produk lebih gampang dipahami itu bukan klaim, tapi contoh.', 'DM kalau mau lihat detail contohnya.'],
    ['Hari 5: Closing/CTA', 'Rangkum siapa yang cocok, masalah yang dibantu, dan ajakan action halus.', 'kalau kamu lagi di fase pengen mulai tapi masih muter-muter, ini bisa jadi langkah awal.', ctx.platformData.cta]
  ];
  return {
    id: 'plan',
    title: 'Rencana Posting 5 Hari',
    copyLabel: 'Copy Rencana Posting',
    type: 'cards',
    cards: plan.map(([heading, idea, hook, cta]) => ({ heading, lines: [`Tema konten: ${heading.split(': ')[1]}`, `Ide posting: ${idea}`, `Hook: “${hook}”`, `CTA: ${cta}`] }))
  };
}

function sectionText(section) {
  if (section.type === 'ordered' || section.type === 'list') return section.items.map((item, index) => section.type === 'ordered' ? `${index + 1}. ${item}` : `- ${item}`).join('\n');
  return section.cards.map(card => {
    const body = card.text || card.lines.map(line => `- ${line}`).join('\n');
    return `${card.heading}\n${body}`;
  }).join('\n\n');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function renderSection(section) {
  if (section.type === 'ordered') return `<ol>${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>`;
  if (section.type === 'list') return `<ul>${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  return `<div class="strategy-list">${section.cards.map(card => `<article class="strategy-item"><strong>${escapeHtml(card.heading)}</strong>${card.text ? `<p class="caption-box">${escapeHtml(card.text)}</p>` : `<ul>${card.lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`}</article>`).join('')}</div>`;
}

function renderResults(sections) {
  const resultGrid = $('#resultGrid');
  resultGrid.innerHTML = sections.map(section => {
    const plain = sectionText(section);
    return `<article class="result-card" id="${section.id}"><div class="result-card-header"><h3>${escapeHtml(section.title)}</h3><button class="btn secondary copy-section" type="button" data-copy="${escapeHtml(plain)}">${escapeHtml(section.copyLabel)}</button></div><div class="content-block">${renderSection(section)}</div></article>`;
  }).join('');
  $$('.copy-section', resultGrid).forEach(button => {
    button.addEventListener('click', () => copyText(button.dataset.copy, `${button.textContent} berhasil`));
  });
}

function copyText(text, message = 'Berhasil dicopy') {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(message));
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  showToast(message);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1700);
}

function getFormValues() {
  return Object.fromEntries(new FormData($('#promoForm')).entries());
}

function setLoading(isLoading) {
  $('#loadingState').hidden = !isLoading;
  $('#emptyState').hidden = isLoading || $('#resultGrid').children.length > 0;
  $('#generateButton').disabled = isLoading;
  $('#generateButton').textContent = isLoading ? 'Lagi mikirin strateginya...' : 'Generate Paket Promosi';
}

function runGenerate(variant = 'default') {
  const form = $('#promoForm');
  if (!form.reportValidity()) return;
  const values = getFormValues();
  $('#resultGrid').innerHTML = '';
  $('#resultActions').hidden = true;
  setLoading(true);

  setTimeout(() => {
    const sections = generatePackage(values, variant);
    const allText = sections.map(section => `# ${section.title}\n${sectionText(section)}`).join('\n\n---\n\n');
    renderResults(sections);
    $('#copyAllButton').onclick = () => copyText(allText, 'Semua paket berhasil dicopy');
    localStorage.setItem(LAST_PACKAGE_KEY, JSON.stringify({ values, variant, generatedAt: new Date().toISOString(), allText }));
    $('#resultActions').hidden = false;
    $('#loadingState').hidden = true;
    $('#emptyState').hidden = true;
    $('#generateButton').disabled = false;
    $('#generateButton').textContent = 'Generate Paket Promosi';
    $('#resultTitle').textContent = 'Paket Promosi Siap Pakai';
    $('#resultTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  $$('[data-variant]').forEach(button => button.addEventListener('click', () => runGenerate(button.dataset.variant)));
}

document.addEventListener('DOMContentLoaded', init);
