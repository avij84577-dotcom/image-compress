document.getElementById('compressBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const targetKB = parseFloat(document.getElementById('targetKB').value);
    
    if (fileInput.files.length === 0 || !targetKB) {
        alert("দয়া করে একটি ছবি সিলেক্ট করুন এবং Target KB লিখুন!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let quality = 0.9;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);
            let sizeInKB = (dataUrl.length * 0.75) / 1024;

            while (sizeInKB > targetKB && quality > 0.1) {
                quality -= 0.05;
                dataUrl = canvas.toDataURL('image/jpeg', quality);
                sizeInKB = (dataUrl.length * 0.75) / 1024;
            }

            document.getElementById('sizeInfo').innerText = "নতুন সাইজ: " + sizeInKB.toFixed(2) + " KB";
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.href = dataUrl;
            document.getElementById('result').style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});