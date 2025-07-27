import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header & Navigation
      "appTitle": "FindSOS.org",
      "appSubtitle": "Global Emergency Response & Missing Person/Pet Search",
      "home": "Home",
      "emergencyMap": "Emergency Map",
      "sosEmergency": "SOS Emergency",
      "search": "Search",
      
      // Main Features
      "sosTitle": "SOS Emergency",
      "sosDescription": "Send emergency distress signals to community and authorities",
      "sendSOS": "Send SOS",
      
      "missingPersonTitle": "Missing Person",
      "missingPersonDescription": "Search for missing family members and loved ones",
      "postMissingPerson": "Post Missing Person",
      "foundPersonTitle": "Found Person",
      "foundPersonDescription": "Help reunite found persons with their families",
      "postFoundPerson": "Post Found Person",
      
      "missingPetTitle": "Missing Pet",
      "missingPetDescription": "Search for lost pets and beloved companions",
      "postMissingPet": "Post Missing Pet",
      "foundPetTitle": "Found Pet", 
      "foundPetDescription": "Help pets find their way back home",
      "postFoundPet": "Post Found Pet",
      
      "disasterAlertTitle": "Disaster Alert",
      "disasterAlertDescription": "Report natural disasters in your area",
      "viewEmergencyMap": "View Emergency Map",
      "reportDisaster": "Report Disaster",
      
      // Location
      "selectLocation": "Select Location",
      "country": "Country",
      "region": "Region",
      "vietnam": "Vietnam",
      "usa": "United States",
      "japan": "Japan",
      "hoChiMinh": "Ho Chi Minh City",
      "hanoi": "Hanoi",
      "daNang": "Da Nang",
      "canTho": "Can Tho",
      "newYork": "New York",
      "california": "California", 
      "texas": "Texas",
      "florida": "Florida",
      "tokyo": "Tokyo",
      "osaka": "Osaka",
      "kyoto": "Kyoto",
      "hiroshima": "Hiroshima",
      
      // Recent News
      "recentNews": "Recent News in",
      "noNewsAvailable": "No news available in this area",
      "beFirstToPost": "Be the first to post in this area!",
      
      // Features
      "globalScope": "Global Scope",
      "communitySupport": "Community Support", 
      "emergencyAlert": "Emergency Alert",
      "smartMatching": "Smart Matching",
      "facebookContact": "Facebook Contact",
      "realTimeUpdates": "Real-time Updates",
      
      // Common
      "loading": "Loading...",
      "cancel": "Cancel",
      "submit": "Submit",
      "save": "Save",
      "edit": "Edit",
      "delete": "Delete",
      "back": "Back",
      "next": "Next",
      "previous": "Previous",
      "close": "Close",
      "confirm": "Confirm",
      "yes": "Yes",
      "no": "No",
      
      // Language
      "language": "Language",
      "english": "English",
      "vietnamese": "Vietnamese",
      "japanese": "Japanese",
      
      // AdSense & Stats
      "quickStats": "Quick Stats",
      "activeCases": "Active Cases",
      "resolved": "Resolved",
      "thisWeek": "This Week",
      "advertisement": "Advertisement",
      
      // PayPal Donation
      "supportUs": "Support Us",
      "supportFindSOS": "Support FindSOS.org",
      "helpMaintainPlatform": "Help maintain our platform",
      "donate": "Donate",
      "donateNow": "Donate Now",
      "donationDescription": "Your support helps us maintain and improve this life-saving platform",
      "whyDonate": "Why Donate?",
      "serverCosts": "Server & Infrastructure",
      "securityUpdates": "Security & Updates",
      "newFeatures": "New Features",
      "chooseAmount": "Choose Amount",
      "customAmount": "Custom",
      "pleaseSelectAmount": "Please select or enter an amount",
      "securePayPal": "Secure payment via PayPal",
      "yourImpact": "Your Impact",
      "impactDescription": "Every donation helps save lives and reunite families worldwide",
      "globalReach": "Global Reach",
      "livesHelped": "Lives Helped",
      "familiesReunited": "Families Reunited",
      "donationEmail": "Donation Email",
      "taxDeductible": "Donations help maintain this free public service"
    }
  },
  vi: {
    translation: {
      // Header & Navigation
      "appTitle": "FindSOS.org",
      "appSubtitle": "Ứng cứu khẩn cấp toàn cầu & Tìm kiếm người/thú cưng thất lạc",
      "home": "Trang chủ",
      "emergencyMap": "Bản đồ khẩn cấp",
      "sosEmergency": "SOS khẩn cấp",
      "search": "Tìm kiếm",
      
      // Main Features
      "sosTitle": "SOS Khẩn Cấp",
      "sosDescription": "Gửi tín hiệu cứu nạn khẩn cấp đến cộng đồng và cơ quan chức năng",
      "sendSOS": "Gửi SOS",
      
      "missingPersonTitle": "Người Thân Thất Lạc",
      "missingPersonDescription": "Tìm kiếm người thân và những người thân yêu thất lạc",
      "postMissingPerson": "Đăng tin tìm người",
      "foundPersonTitle": "Tìm Thấy Người",
      "foundPersonDescription": "Giúp đoàn tụ những người được tìm thấy với gia đình",
      "postFoundPerson": "Đăng tin tìm thân nhân",
      
      "missingPetTitle": "Thú Cưng Thất Lạc",
      "missingPetDescription": "Tìm kiếm thú cưng và những người bạn thân yêu bị thất lạc",
      "postMissingPet": "Đăng tin tìm thú cưng",
      "foundPetTitle": "Tìm Thấy Thú Cưng",
      "foundPetDescription": "Giúp thú cưng tìm đường về nhà",
      "postFoundPet": "Đăng tin tìm chủ",
      
      "disasterAlertTitle": "Cảnh Báo Thiên Tai",
      "disasterAlertDescription": "Báo cáo thiên tai trong khu vực của bạn",
      "viewEmergencyMap": "Xem bản đồ khẩn cấp",
      "reportDisaster": "Báo cáo thiên tai",
      
      // Location
      "selectLocation": "Chọn khu vực",
      "country": "Quốc gia",
      "region": "Khu vực",
      "vietnam": "Việt Nam",
      "usa": "Hoa Kỳ",
      "japan": "Nhật Bản",
      "hoChiMinh": "TP. Hồ Chí Minh",
      "hanoi": "Hà Nội",
      "daNang": "Đà Nẵng",
      "canTho": "Cần Thơ",
      "newYork": "New York",
      "california": "California",
      "texas": "Texas", 
      "florida": "Florida",
      "tokyo": "Tokyo",
      "osaka": "Osaka",
      "kyoto": "Kyoto",
      "hiroshima": "Hiroshima",
      
      // Recent News
      "recentNews": "Tin tức gần đây tại",
      "noNewsAvailable": "Chưa có tin tức nào trong khu vực này",
      "beFirstToPost": "Hãy là người đầu tiên đăng tin trong khu vực này!",
      
      // Features
      "globalScope": "Phạm vi toàn cầu",
      "communitySupport": "Cộng đồng hỗ trợ",
      "emergencyAlert": "Cảnh báo khẩn cấp",
      "smartMatching": "Ghép nối thông minh",
      "facebookContact": "Liên hệ Facebook",
      "realTimeUpdates": "Cập nhật thời gian thực",
      
      // Common
      "loading": "Đang tải...",
      "cancel": "Hủy",
      "submit": "Gửi",
      "save": "Lưu",
      "edit": "Sửa",
      "delete": "Xóa",
      "back": "Quay lại",
      "next": "Tiếp theo",
      "previous": "Trước đó",
      "close": "Đóng",
      "confirm": "Xác nhận",
      "yes": "Có",
      "no": "Không",
      
      // Language
      "language": "Ngôn ngữ",
      "english": "Tiếng Anh",
      "vietnamese": "Tiếng Việt",
      "japanese": "Tiếng Nhật",
      
      // AdSense & Stats
      "quickStats": "Thống kê nhanh",
      "activeCases": "Trường hợp đang hoạt động",
      "resolved": "Đã giải quyết",
      "thisWeek": "Tuần này",
      "advertisement": "Quảng cáo",
      
      // PayPal Donation
      "supportUs": "Ủng hộ chúng tôi",
      "supportFindSOS": "Ủng hộ FindSOS.org",
      "helpMaintainPlatform": "Giúp duy trì nền tảng của chúng tôi",
      "donate": "Quyên góp",
      "donateNow": "Quyên góp ngay",
      "donationDescription": "Sự ủng hộ của bạn giúp chúng tôi duy trì và cải thiện nền tảng cứu sinh này",
      "whyDonate": "Tại sao quyên góp?",
      "serverCosts": "Chi phí máy chủ & hạ tầng",
      "securityUpdates": "Bảo mật & cập nhật",
      "newFeatures": "Tính năng mới",
      "chooseAmount": "Chọn số tiền",
      "customAmount": "Tùy chỉnh",
      "pleaseSelectAmount": "Vui lòng chọn hoặc nhập số tiền",
      "securePayPal": "Thanh toán bảo mật qua PayPal",
      "yourImpact": "Tác động của bạn",
      "impactDescription": "Mỗi khoản quyên góp đều giúp cứu sống và đoàn tụ các gia đình trên toàn thế giới",
      "globalReach": "Phạm vi toàn cầu",
      "livesHelped": "Cuộc sống được giúp đỡ",
      "familiesReunited": "Gia đình đoàn tụ",
      "donationEmail": "Email quyên góp",
      "taxDeductible": "Quyên góp giúp duy trì dịch vụ công cộng miễn phí này"
    }
  },
  ja: {
    translation: {
      // Header & Navigation
      "appTitle": "FindSOS.org",
      "appSubtitle": "グローバル緊急対応・行方不明者/ペット検索",
      "home": "ホーム",
      "emergencyMap": "緊急マップ",
      "sosEmergency": "SOS緊急",
      "search": "検索",
      
      // Main Features
      "sosTitle": "SOS緊急",
      "sosDescription": "コミュニティと当局に緊急救難信号を送信",
      "sendSOS": "SOSを送信",
      
      "missingPersonTitle": "行方不明者",
      "missingPersonDescription": "行方不明の家族や愛する人を検索",
      "postMissingPerson": "行方不明者を投稿",
      "foundPersonTitle": "発見された人",
      "foundPersonDescription": "発見された人を家族と再会させる支援",
      "postFoundPerson": "発見者を投稿",
      
      "missingPetTitle": "行方不明ペット",
      "missingPetDescription": "迷子のペットや愛するコンパニオンを検索",
      "postMissingPet": "行方不明ペットを投稿",
      "foundPetTitle": "発見されたペット",
      "foundPetDescription": "ペットが家に帰る手助け",
      "postFoundPet": "発見ペットを投稿",
      
      "disasterAlertTitle": "災害警報",
      "disasterAlertDescription": "あなたの地域の自然災害を報告",
      "viewEmergencyMap": "緊急マップを表示",
      "reportDisaster": "災害を報告",
      
      // Location
      "selectLocation": "場所を選択",
      "country": "国",
      "region": "地域",
      "vietnam": "ベトナム",
      "usa": "アメリカ合衆国",
      "japan": "日本",
      "hoChiMinh": "ホーチミン市",
      "hanoi": "ハノイ",
      "daNang": "ダナン",
      "canTho": "カントー",
      "newYork": "ニューヨーク",
      "california": "カリフォルニア",
      "texas": "テキサス",
      "florida": "フロリダ",
      "tokyo": "東京",
      "osaka": "大阪",
      "kyoto": "京都",
      "hiroshima": "広島",
      
      // Recent News
      "recentNews": "最近のニュース",
      "noNewsAvailable": "この地域にはニュースがありません",
      "beFirstToPost": "この地域で最初に投稿してください！",
      
      // Features
      "globalScope": "グローバル範囲",
      "communitySupport": "コミュニティサポート",
      "emergencyAlert": "緊急警報",
      "smartMatching": "スマートマッチング",
      "facebookContact": "Facebook連絡",
      "realTimeUpdates": "リアルタイム更新",
      
      // Common
      "loading": "読み込み中...",
      "cancel": "キャンセル",
      "submit": "送信",
      "save": "保存",
      "edit": "編集",
      "delete": "削除",
      "back": "戻る",
      "next": "次へ",
      "previous": "前へ",
      "close": "閉じる",
      "confirm": "確認",
      "yes": "はい",
      "no": "いいえ",
      
      // Language
      "language": "言語",
      "english": "英語",
      "vietnamese": "ベトナム語",
      "japanese": "日本語",
      
      // AdSense & Stats
      "quickStats": "クイック統計",
      "activeCases": "アクティブケース",
      "resolved": "解決済み",
      "thisWeek": "今週",
      "advertisement": "広告",
      
      // PayPal Donation
      "supportUs": "サポート",
      "supportFindSOS": "FindSOS.orgをサポート",
      "helpMaintainPlatform": "プラットフォームの維持にご協力ください",
      "donate": "寄付",
      "donateNow": "今すぐ寄付",
      "donationDescription": "あなたのサポートは、この命を救うプラットフォームの維持と改善に役立ちます",
      "whyDonate": "なぜ寄付するのか？",
      "serverCosts": "サーバー・インフラ",
      "securityUpdates": "セキュリティ・アップデート",
      "newFeatures": "新機能",
      "chooseAmount": "金額を選択",
      "customAmount": "カスタム",
      "pleaseSelectAmount": "金額を選択または入力してください",
      "securePayPal": "PayPalによる安全な支払い",
      "yourImpact": "あなたの影響",
      "impactDescription": "すべての寄付は世界中の命を救い、家族を再会させるのに役立ちます",
      "globalReach": "グローバルリーチ",
      "livesHelped": "助けられた命",
      "familiesReunited": "再会した家族",
      "donationEmail": "寄付メール",
      "taxDeductible": "寄付はこの無料公共サービスの維持に役立ちます"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Default language
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;

