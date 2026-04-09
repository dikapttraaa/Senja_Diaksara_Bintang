// --- FUNGSI BUKA SURAT ---
function bukaSurat() {
    const musik = document.getElementById('backsound');
    const questionText = document.getElementById('question');

    // Putar musik
    if (musik) {
        musik.play().catch(e => console.log("Audio play blocked"));
    }

    // Pindah halaman
    document.getElementById('surat-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';

    // JALANKAN EFEK MENGETIK
    if (questionText) {
        questionText.classList.add('start-typing');
    }
}

// --- FUNGSI PINDAH TOMBOL ---
function pindahTombol() {
    const btn = document.getElementById('btn-ngga');

    // Pindahkan ke body agar hitungan layar akurat
    if (btn.parentNode.className === 'buttons') {
        document.body.appendChild(btn);
    }

    btn.style.position = 'fixed';
    btn.style.zIndex = '9999';

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const padding = 40;

    const maxX = vw - btnWidth - padding;
    const maxY = vh - btnHeight - padding;

    let randomX = Math.random() * (maxX - padding) + padding;
    let randomY = Math.random() * (maxY - padding) + padding;

    // Pengaman jika layar terlalu kecil
    if (randomX < padding || randomX > maxX) randomX = vw / 2 - btnWidth / 2;
    if (randomY < padding || randomY > maxY) randomY = vh / 2 - btnHeight / 2;

    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transition = "all 0.3s ease-out";
}

// --- FUNGSI JAWABAN YA ---
function tunjukkanCinta() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `
        <h1 style="font-size: 36px; margin-bottom: 15px;">Yay! I Love You, Ribka! 💖</h1>
        <p style="font-size: 18px; color: #e0e0e0;">Screenshot, kirim ke aku!!.</p>
    `;

    const btnNgga = document.getElementById('btn-ngga');
    if (btnNgga) btnNgga.remove();

    mulaiAnimasiBunga();
}

// Fungsi untuk Tambah/Kurang Volume
function ubahVolume(amount) {
    // Ambil elemen audio langsung di sini
    const musik = document.getElementById('backsound');

    if (musik) {
        // 1. Matikan mode mute jika sedang menyala
        musik.muted = false;

        // 2. Hitung volume baru
        let volumeBaru = musik.volume + amount;

        // 3. Batasi rentang (0.0 sampai 1.0)
        if (volumeBaru > 1) volumeBaru = 1;
        if (volumeBaru < 0) volumeBaru = 0;

        // 4. Terapkan secara paksa
        musik.volume = volumeBaru;

        // 5. Cek di Console (Klik kanan inspeksi -> Console)
        console.log("Volume Web Berhasil Diubah: " + Math.round(musik.volume * 100) + "%");
    } else {
        console.error("Elemen audio dengan ID 'backsound' tidak ditemukan!");
    }
}

function toggleMute() {
    const musik = document.getElementById('backsound');
    const btn = document.getElementById('mute-btn');
    if (musik && btn) {
        musik.muted = !musik.muted;
        // Ganti ikon berdasarkan status
        btn.innerText = musik.muted ? "🔊" : "🔇"; 
    }
}
// --- ANIMASI BUNGA JATUH ---
const emojisBunga = ['✨', '💫', '💛', '🌸', '🔱']; 

function mulaiAnimasiBunga() {
    const wrapper = document.getElementById('flower-wrapper');
    wrapper.style.display = 'block';
    for (let i = 0; i < 60; i++) {
        setTimeout(buatSatuBunga, i * 80);
    }
}

function buatSatuBunga() {
    const wrapper = document.getElementById('flower-wrapper');
    const flower = document.createElement('div');
    flower.style.position = 'fixed';
    flower.style.color = '#d4af37';
    flower.innerText = emojisBunga[Math.floor(Math.random() * emojisBunga.length)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = '-5vh';
    flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
    flower.style.zIndex = '1000';
    
    const duration = Math.random() * 3 + 2;
    flower.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
    ], { duration: duration * 1000, easing: 'linear' });

    wrapper.appendChild(flower);
    setTimeout(() => flower.remove(), duration * 1000);
}