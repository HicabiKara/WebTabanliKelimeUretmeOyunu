# HeptaWord Kelime Üretme Oyunu

HeptaWord MERN stack teknolojileri kullanılarak geliştirilmiş belirli kurallara göre oynanan bir çeşit kelime üretme oyunudur.

## Özellikler

- Üyelik Ve Giriş Sistemi
- Üyelik bilgileri görüntüleme,güncelleme ve kaldırma
- Üye olmadan çevrimdışı oynayabilme
- Liderlik tablosu
- Çevrimiçi oyunlarda daha önce oynanmış oyun verilerini görüntüleme

## Ekran Görüntüleri/Screeenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/deaf08d6-8e60-42d9-944f-73810bf36a25" alt="Proje Anasayfa Alanı"/>
  <br>
  <i>Anasayfa alanının görünümü.</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/22d75b64-d959-4403-9bf6-b2ab47903595" alt="Oyunu oynama alanı"/>
  <br>
  <i>Oyunun oynandığı alanın görünümü.</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/59b983b3-e8c6-43d7-91d2-41d5bd56b013" alt="Oyunun başlaması durumu"/>
  <br>
  <i>Oyunun başlaması durumundaki ekran.</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a90a4922-0c58-4d8b-8efb-a124c10a0b8f" alt="Oyunun başlaması durumu"/>
  <br>
  <i>Kullanıcı hesabım sayfası-Hesap bilgileri </i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c7436dec-68af-4d21-9bb1-0d647cc96e3f" alt="Oyunun başlaması durumu"/>
  <br>
  <i>Kullanıcı hesabım sayfası-oyun verilerini görüntüleme </i>
</p>

## Kullanılan Teknolojiler/Used Technologies

Bu projede aşağıdaki teknolojiler kullanılmıştır:

- MongoDB
- ExpressJS
- React
- Node.js
- TailwindCSS
- Axios
- react-countdown-circle-timer
- react-icons
- react-redux
- react-toastify
- cors
- dotenv
- jsonwebtoken
- mongoose

## Kurulum Talimatları/Installation Instructions
Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin.

### Gereksinimler/Requirements

- [Node.js](https://nodejs.org/en)(v14+)
- [MongoDB](https://www.mongodb.com/try/download/community)(yerel olarak kurabilir veya MongoDB Atlas kullanabilirsiniz)
- [MongoDB Compass](https://www.mongodb.com/products/compass)(isteğe bağlı, veritabanı yönetimi için)

### Adım 1: Projeyi Klonlayın
```bash 
git clone https://github.com/HicabiKara/WebTabanliKelimeUretmeOyunu.git
cd WebTabanliKelimeUretmeOyunu-master
```
### Adım 2: Bağımlılıkları Yükleyin

```bash 
  cd backend
  npm install
```

```bash 
  cd ..
  cd front-end
  npm install
```
### Adım 3:MongoDB'yi Kurun ve Çalıştırın
MongoDB'nin yerel olarak kurulu olduğundan ve çalıştığından emin olun. Eğer MongoDB'yi yerel olarak kullanıyorsanız, veritabanını başlatmak için şu komutu çalıştırın:
```bash 
  mongod
```
### Adım 4:.env Dosyasını Güncelleyin
.env dosyasındaki MONGO_URI değişkeni içersinde kendi mongoDB URI'nizi belirtin.

### Adım 5:Backend Sunucusunu Başlatın
```bash 
  cd backend
  npm start
```

### Adım 6:Front-end Sunucusunu Başlatın
```bash 
  cd front-end
  npm start
```
front-end sunucusu çalışmaya başladığında tarayıcınızda otomatik olarak http://localhost:3000 adresinde uygulamayı açacaktır. 


