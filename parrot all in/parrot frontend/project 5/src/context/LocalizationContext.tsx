import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// === 1. TERCÜME SÖZLÜKLERİ ===
// Hata önleme amacıyla artık 'translations' objesini doğrudan export ediyoruz.
export const translations = {
  tr: {
    // Header ve Navigasyon
    home: 'Ana Sayfa',
    about: 'Hakkında',
    tokenomics: 'Tokenomik',
    how_to_buy: 'Nasıl Alınır',
    roadmap: 'Yol Haritası',
    connect_wallet: 'Cüzdanı Bağla',
    
    // Wallet Modal
    modal_title: 'Cüzdanını Bağla',
    metamask: 'MetaMask / Tarayıcı Eklentileri',
    wc_mobile: 'WalletConnect (150+ Mobil Cüzdan)',
    direct_transfer: 'Veya doğrudan adrese gönder',
    copy: 'Kopyala',
    connected: 'Bağlandı',
    disconnect: 'Bağlantıyı Kes',
    connect_terms: 'Bağlanarak Parrot Token hüküm ve koşullarını kabul etmiş olursunuz.',
    
    // Hero Alanı
    hero_slogan: 'Çığlığını At, Ay’a Uç! ',
    hero_desc: 'Kriptonun en canlı topluluğuna katıl! Parrot Token sıfır vergi, ışık hızında işlemler ve efsane özellikleriyle blok zincirinde kanat çırpıyor.',
    presale_live: 'Ön Satış Başladı',
    presale_price: 'her $PARROT birimi',
    presale_ends_in: 'Ön Satışın Bitmesine Kalan Süre:',
    buy_now: 'ŞİMDİ $PARROT AL',
    current_stage: 'Mevcut Aşama',
    next_price: 'Sonraki Fiyat',
    
    // HomePage Alanı
    secure_tokens_title: '$PARROT Tokenlarını Güvence Altına Al',
    presale_join_desc: 'Halka arzdan önce ön satışa katıl, en avantajlı fiyatı kap! 🦜',

    // Presale Widget
    stage_live: 'Aşama Yayında',
    join_presale: 'Ön Satışa Katıl',
    fundraising_progress: 'Fon Toplama Durumu',
    raised: 'Toplanan Miktar',
    goal: 'Hedef',
    presale_stages: 'Ön Satış Aşamaları',
    next_price_increase: 'Sonraki Aşamada Fiyat Artışı:',
    transaction_success: 'İşlem Başarılı!',
    view_on_explorer: 'Blockchain Tarayıcısında Görüntüle',
    you_pay: 'Ödeyeceğin Tutar',
    you_receive: 'Alacağın Miktar ($PARROT)',
    buy_with: 'İLE AL',
    hours: 'SAAT',
    minutes: 'DAKİKA',
    seconds: 'SANİYE',
    live_status: 'YAYINDA',
    sold_out_status: 'TÜKENDİ',
    upcoming_status: 'YAKINDA',

    // === REFERRAL WIDGET METİNLERİ ===
    referral_title: 'Referans Programı 🎁',
    referral_desc: 'Arkadaşlarını davet et, her alımda %20’ye varan bonus kazan! Ne kadar çok davet, o kadar çok kazanç! 🦜',
    unlock_dashboard: 'Kontrol Panelinizin Kilidini Açın',
    connect_to_stats: 'Referans istatistiklerinizi görmek, benzersiz bağlantınızı oluşturmak ve kazanmaya başlamak için kripto cüzdanınızı bağlayın.',
    connect_to_start: 'Başlamak İçin Cüzdanı Bağla',
    loading_data: 'Verileriniz Yükleniyor...',
    member: 'Üye',
    total_referrals: 'Toplam Referans',
    total_earned: 'Toplam Kazanç',
    pending: 'Beklemede',
    your_link: 'Referans Bağlantınız',
    copy_link: 'Bağlantıyı Kopyala',
    copied: 'Kopyalandı!',
    current_bonus: 'Mevcut Bonus',
    on_every_purchase: 'Her referans alımında',
    tiers_title: 'Referans Seviyeleri',
    current_level: 'MEVCUT SEVİYE',
    referrals: 'davet',
    bonus: 'bonus',
    how_it_works: 'Nasıl Çalışır',
    step_1_share: 'Bağlantınızı Paylaşın',
    step_1_desc: 'Benzersiz referans bağlantınızı kopyalayın ve arkadaşlarınızla paylaşın.',
    step_2_buy: 'Arkadaşlarınız Token Alır',
    step_2_desc: 'Birisi bağlantınızı kullanarak $PARROT tokeni aldığında, siz bonus kazanırsınız!',
    step_3_earn: 'Ödülleri Kazanın',
    step_3_desc: 'Referans seviyenize göre anında bonus token kazanın.',
    special_bonus: 'Özel Bonus!',
    special_bonus_desc: '10 kişi davet et, 0.1 ETH değerinde özel bir TOKEN PARROT NFT kazan! 🎨',
    recent_activity: 'Son Referanslar',
    purchase: 'Alım',
    your_bonus: 'Sizin Bonusunuz',
    view_all_activity: 'Tüm Etkinliği Gör',
    start_earning_title: 'Kazanmaya Şimdi Başla!',
    start_earning_desc: 'Referans programımız aracılığıyla pasif gelir elde eden binlerce TOKEN PARROT elçisine katılın!',
    share_link_now: 'Bağlantınızı Hemen Paylaşın 🎁',
    connect_wallet_to_start_lock: 'Başlamak İçin Cüzdanı Bağla 🔒',
    could_not_fetch_data: 'Referans verileri çekilemedi.',
    try_again_or_refresh: 'Lütfen cüzdanınızı tekrar bağlamayı veya sayfayı yenilemeyi deneyin.',

    // === FEATURES WIDGET METİNLERİ ===
    features_title: 'Neden $PARROT? Temel Özellikler',
    features_desc: 'Kriptonun en canlı ve zengin özellikli ekosistemine katılın. $PARROT eğlenceyi, ciddi faydayı ve ileri teknolojiyi birleştiriyor.',
    feature_1_title: 'Sıfır İşlem Vergisi	',
    feature_1_desc: 'Alım veya satım vergisi yok. Kazancınızın %100\'ünü saklayın ve gizli ücretler olmadan özgürce ticaret yapın.',
    feature_2_title: 'Yıldırım Hızında İşlemler',
    feature_2_desc: 'Anında işlemler ve minimum gas ücreti için gelişmiş Layer 2 teknolojisi üzerine inşa edilmiştir.',
    feature_3_title: 'Topluluk Odaklı',
    feature_3_desc: 'Topluluk tarafından yönetiliyor! Her bir holder, $PARROT’un geleceği hakkında söz sahibidir.',
    feature_4_title: 'Tamamen Denetlenmiş ve Güvenli',
    feature_4_desc: 'Maksimum güvenlik ve güvenilirlik için akıllı sözleşmeler CertiK ve SolidProof tarafından denetlenmiştir.',
    feature_5_title: 'Staking Ödülleri',
    feature_5_desc: 'Ödüllü hazine sandığı havuzlarımızda $PARROT tokenlerinizi stake ederek pasif gelir elde edin.',
    feature_6_title: 'Özel Layer 2 Blok Zinciri',
    feature_6_desc: 'EVM uyumluluğu ve zincirler arası köprü işlevselliği ile kendi Layer 2 çözümü.',
    stats_supply: 'Toplam Arz',
    stats_raised: 'Toplanan',
    stats_holders: 'Toplam Holder Sayısı',
    stats_support: 'Destek',
    talk_is_cheap_title: 'Konuşmak Bedava, Ama Papağanlar Paha Biçilmez! 🦜',
    talk_is_cheap_desc: '$PARROT0\'u gerçekten farklı kılanlar:',
    why_feature_1: 'Özel Layer 2 blok zinciri teknolojisi',
    why_feature_2: 'EVM uyumlu akıllı sözleşmeler',
    why_feature_3: 'Anti-sniper bot koruması',
    why_feature_4: 'Yakında DAO yönetimi geliyor',
    why_feature_5: 'NFT pazaryeri entegrasyonu',
    why_feature_6: 'Zincirler arası köprü işlevselliği',

    // === TOKENOMICS WIDGET METİNLERİ ===
    tokenomics_desc: '$PARROT ekosisteminin sürdürülebilir büyümesi ve uzun vadeli başarısı için tasarlanmış adil ve şeffaf token dağıtımı.',
    token_distribution: 'Token Dağıtımı',
    dist_presale: 'Ön Satış',
    dist_liquidity: 'Likidite Havuzu',
    dist_marketing: 'Pazarlama ve Ortaklıklar',
    dist_team: 'Ekip (12 Aylık Kilit)',
    token_unit: 'Token',
    token_feature_1_title: 'Deflasyon Mekanizması',
    token_feature_1_desc: 'Otomatik token yakma işlemleri zamanla arzı azaltarak kıtlığı ve değeri artırır.',
    token_feature_2_title: 'Staking Ödülleri',
    token_feature_2_desc: 'Yenilikçi staking havuzlarımız ve ödül sistemimiz aracılığıyla pasif gelir elde edin.',
    token_feature_3_title: 'DAO Yönetimi',
    token_feature_3_desc: 'Merkeziyetsiz Otonom Organizasyon (DAO) oylaması yoluyla topluluk odaklı kararlar.',
    token_tax: 'İşlem Vergisi',
    months: 'Ay',
    team_lock_period: 'Ekip Kilit Süresi',
    blockchain_tech: 'Blok Zinciri Teknolojisi',

    // === HOW TO BUY WIDGET METİNLERİ ===
    buy_title: '$PARROT Nasıl Alınır',
    buy_desc: 'Halka arzdan önce $PARROT tokenlerinizi en iyi fiyattan güvenceye almak için bu basit adımları izleyin!',
    buy_step_1_title: 'Adım 1: Cüzdanınızı Bağlayın',
    buy_step_1_desc: 'MetaMask, Trust Wallet veya herhangi bir Web3 cüzdanınızı güvenli platformumuza bağlayın.',
    buy_step_2_title: 'Adım 2: Ödeme Yöntemini Seçin',
    buy_step_2_desc: 'Tercih ettiğiniz ödeme yöntemini seçin - Ethereum (ETH) veya Tether (USDT).',
    buy_step_3_title: 'Adım 3: Satın Alma Miktarını Girin',
    buy_step_3_desc: 'Yatırım yapmak istediğiniz miktarı girin ve kaç adet $PARROT tokeni alacağınızı görün.',
    buy_step_4_title: 'Adım 4: İşlemi Onaylayın',
    buy_step_4_desc: 'İşlem detaylarınızı gözden geçirin ve tek bir tıklama ile satın alımınızı onaylayın.',
    buy_step_5_title: 'Adım 5: Tokenlarınızı Talep Edin',
    buy_step_5_desc: 'Ön satış sona erdikten sonra $PARROT tokenlerinizi doğrudan cüzdanınıza talep edin.',
    info_1_title: 'Anında İşlem Onayı',
    info_1_desc: 'İşleminiz blok zinciri onayı ile anında işlenir.',
    info_2_title: 'Güvenli ve Denetlenmiş',
    info_2_desc: 'Tüm işlemler blok zinciri teknolojisi ve akıllı sözleşmelerle güvence altına alınmıştır.',
    info_3_title: 'Gizli Ücret Yok',
    info_3_desc: 'Gördüğünüzü ödersiniz. Sürprizsiz, şeffaf fiyatlandırma.',
    cta_title: 'Başlamaya Hazır mısınız?',
    cta_desc: 'Şimdi ön satışa katılın ve $PARROT tokenlerinizi en iyi fiyattan güvenceye alın!',
    start_buying_now: 'Şimdi $PARROT Satın Almaya Başla',

    // === COMMUNITY WIDGET METİNLERİ ===
    community_title: '$PARROT Sürüsüne Katılın!',
    community_desc: 'Kripto dünyasının en canlı ve destekleyici topluluğunun parçası olun. Birlikte harika işler başarıyoruz!',
    stat_holders: 'Token Holder Sayısı',
    stat_twitter: 'Twitter Takipçi',
    stat_telegram: 'Telegram Üyesi',
    stat_growth: 'Bu Ayki Büyüme',
    milestones_title: 'Topluluk Kilometre Taşları ve Ödüller',
    milestone_10k: '10K Holder',
    milestone_25k: '25K Holder',
    milestone_50k: '50K Holder',
    milestone_100k: '100K Holder',
    reward_nft: 'Topluluk NFT Dağıtımı',
    reward_staking: 'Staking Havuzu Lansmanı',
    reward_cex: 'Büyük CEX Listelemesi',
    reward_mainnet: 'Layer 2 Ana Ağ Lansmanı',
    completed: 'TAMAMLANDI',
    social_title: 'Topluluğumuzla Bağlantı Kurun',
    follow_twitter: 'Twitter\'da Takip Et',
    join_telegram: 'Telegram\'a Katıl',
    discord_server: 'Discord Sunucusu',
    testimonials_title: 'Topluluğumuz Ne Diyor',
    testimonial_1: '"Şimdiye kadar dahil olduğum en iyi meme token topluluğu! Ekip şeffaf ve yol haritası harika."',
    testimonial_2: '"TOKEN PARROT aya gidiyor! Layer 2 teknolojisi ve sıfır vergisi oyunu değiştiriyor."',
    testimonial_3: '"Sonuna kadar diamond hands! Bu projenin arkasında gerçek fayda ve inanılmaz bir topluluk var."',

    // === FOOTER WIDGET METİNLERİ (YENİ EKLENDİ) ===
    footer_brand_desc: 'Kripto ormanının en renkli ve yenilikçi meme tokenı. Sıfır vergi, yıldırım hızında işlemler ve canlı bir topluluk ile sürümüze katılın ve finansal özgürlüğe doğru ilerleyin.',
    contract_address: 'Sözleşme Adresi',
    join_our_flock: 'Sürümüze Katılın',
    followers_label: 'takipçi',
    social_twitter: 'Twitter',
    social_telegram: 'Telegram',
    social_discord: 'Discord',
    security_trust_title: 'Güvenlik ve Güvenilirlik',
    audit_certik_title: 'CertiK Denetimli',
    audit_solidproof_title: 'SolidProof Denetimli',
    audit_smart_contract: 'Akıllı Sözleşme Denetimi',
    security_verification: 'Güvenlik Doğrulaması',
    whitepaper_title: 'Teknik Doküman (Whitepaper)',
    technical_documentation: 'Teknik Dokümantasyon',
    copyright_text: '© 2024 $PARROT Token. Tüm hakları saklıdır. Sorumlu davranın! 🦜',
    privacy_policy: 'Gizlilik Politikası',
    terms_of_service: 'Hizmet Şartları',
    disclaimer: 'Yasal Uyarı',
    disclaimer_warning_title: 'Önemli Uyarı',
    disclaimer_text: '$PARROT eğlence ve topluluk amaçlı oluşturulmuş bir meme tokendir. Kripto para yatırımları önemli risk ve yüksek volatilite taşır. Lütfen sorumlu yatırım yapın ve sadece kaybetmeyi göze alabileceğiniz kadar yatırım yapın. Bu web sitesi ve içeriği finansal tavsiye teşkil etmez. Herhangi bir yatırım kararı vermeden önce daima kendi araştırmanızı (DYOR) yapın. Geçmiş performans gelecekteki sonuçları garanti etmez. $PARROT tokenlerini satın alarak bu riskleri kabul etmiş olursunuz.',

  },
  en: {
    // Header and Navigation
    home: 'Home',
    about: 'About',
    tokenomics: 'Tokenomics',
    how_to_buy: 'How to Buy',
    roadmap: 'Roadmap',
    connect_wallet: 'Connect Wallet',

    // Wallet Modal
    modal_title: 'Connect Your Wallet',
    metamask: 'MetaMask / Browser Extensions',
    wc_mobile: 'WalletConnect (150+ Mobile Wallets)',
    direct_transfer: 'Or Send Directly to This Address',
    copy: 'Copy',
    connected: 'Connected',
    disconnect: 'Disconnect',
    connect_terms: 'By connecting, you agree to the Parrot Token terms and conditions.',

    // Hero Section
    hero_slogan: 'Squawk Your Way to the Moon!',
    hero_desc: 'Join the most colorful community in crypto! TOKEN PARROT is spreading its wings across the blockchain with zero taxes, lightning-fast transactions, and a flock of amazing features.',
    presale_live: 'Presale Stage Live',
    presale_price: 'per $PARROT',
    presale_ends_in: 'Presale Ends In:',
    buy_now: 'BUY $PARROT NOW',
    current_stage: 'Current Stage',
    next_price: 'Next Price',
    
    // HomePage Section
    secure_tokens_title: 'Secure Your $PARROT Tokens',
    presale_join_desc: 'Join the presale now and get the best price before public launch! 🦜',

    // Presale Widget
    stage_live: 'Stage Live',
    join_presale: 'Join the Presale',
    fundraising_progress: 'Fundraising Progress',
    raised: 'Raised',
    goal: 'Goal',
    presale_stages: 'Presale Stages',
    next_price_increase: 'Next Stage Price Increase In:',
    transaction_success: 'Transaction Successful!',
    view_on_explorer: 'View on Explorer',
    you_pay: 'You Pay',
    you_receive: 'You Receive ($PARROT)',
    buy_with: 'BUY WITH',
    hours: 'HRS',
    minutes: 'MIN',
    seconds: 'SEC',
    live_status: 'LIVE',
    sold_out_status: 'SOLD OUT',
    upcoming_status: 'UPCOMING',


    // === REFERRAL WIDGET METİNLERİ ===
    referral_title: 'Referral Program 🎁',
    referral_desc: 'Invite friends and earn up to 15% bonus on every purchase! The more you refer, the more you earn! 🦜',
    unlock_dashboard: 'Unlock Your Dashboard',
    connect_to_stats: 'Connect your crypto wallet to see your referral stats, generate your unique link, and start earning!',
    connect_to_start: 'Connect Wallet to Start',
    loading_data: 'Loading your data...',
    member: 'Member',
    total_referrals: 'Total Referrals',
    total_earned: 'Total Earned',
    pending: 'Pending',
    your_link: 'Your Referral Link',
    copy_link: 'Copy Link',
    copied: 'Copied!',
    current_bonus: 'Current Bonus',
    on_every_purchase: 'On every referral purchase',
    tiers_title: 'Referral Tiers',
    current_level: 'CURRENT LEVEL',
    referrals: 'referrals',
    bonus: 'bonus',
    how_it_works: 'How It Works',
    step_1_share: 'Share Your Link',
    step_1_desc: 'Copy and share your unique referral link with friends and family.',
    step_2_buy: 'Friends Buy Tokens',
    step_2_desc: 'When someone uses your link to buy $PARROT tokens, you earn a bonus!',
    step_3_earn: 'Earn Rewards',
    step_3_desc: 'Receive instant bonus tokens based on your referral tier level.',
    special_bonus: 'Special Bonus!',
    special_bonus_desc: 'Refer 10 people in the first week and get an exclusive TOKEN PARROT NFT worth 0.1 ETH! 🎨',
    recent_activity: 'Recent Referrals',
    purchase: 'Purchase',
    your_bonus: 'Your Bonus',
    view_all_activity: 'View All Activity',
    start_earning_title: 'Start Earning Today!',
    start_earning_desc: 'Join thousands of TOKEN PARROT ambassadors who are earning passive income through our referral program!',
    share_link_now: 'Share Your Link Now 🎁',
    connect_wallet_to_start_lock: 'Connect Wallet to Start 🔒',
    could_not_fetch_data: 'Could not fetch referral data.',
    try_again_or_refresh: 'Please try connecting your wallet again or refresh the page.',

    // === FEATURES WIDGET METİNLERİ ===
    features_title: 'Why $PARROT? Key Features',
    features_desc: 'Join the most vibrant and feature-rich meme token ecosystem. $PARROT blends fun with serious utility and cutting-edge technology.',
    feature_1_title: 'Zero Transaction Tax',
    feature_1_desc: 'Enjoy 0% tax on all buys and sells. Keep 100% of your gains and trade freely without hidden fees.',
    feature_2_title: 'Lightning-Fast Transactions',
    feature_2_desc: 'Built on advanced Layer 2 technology for instant transactions and minimal gas fees.',
    feature_3_title: 'Community Driven',
    feature_3_desc: 'Governed by the flock! Every holder has a voice in the future of $PARROT.',
    feature_4_title: 'Fully Audited and Secure',
    feature_4_desc: 'Smart contracts audited by CertiK and SolidProof for maximum security and trust.',
    feature_5_title: 'Staking Rewards',
    feature_5_desc: 'Earn passive income by staking your $PARROT tokens in our rewarding treasure chest pools.',
    feature_6_title: 'Proprietary Layer 2 Blockchain',
    feature_6_desc: 'Own Layer 2 solution with EVM compatibility and cross-chain bridge functionality.',
    stats_supply: 'Total Supply',
    stats_raised: 'Raised',
    stats_holders: 'Total Holders',
    stats_support: 'Support',
    talk_is_cheap_title: 'Talk is Cheap, But Parrots Are Priceless! 🦜',
    talk_is_cheap_desc: "What truly sets $PARROT apart:",
    why_feature_1: 'Own Layer 2 blockchain technology',
    why_feature_2: 'EVM compatible smart contracts',
    why_feature_3: 'Anti-sniper bot protection',
    why_feature_4: 'DAO governance coming soon',
    why_feature_5: 'NFT marketplace integration',
    why_feature_6: 'Cross-chain bridge functionality',
    
    // === TOKENOMICS WIDGET METİNLERİ ===
    tokenomics_desc: 'Fair and transparent distribution, designed for the sustainable growth and long-term success of the $PARROT ecosystem.',
    token_distribution: 'Token Distribution',
    dist_presale: 'Presale',
    dist_liquidity: 'Liquidity Pool',
    dist_marketing: 'Marketing & Partnerships',
    dist_team: 'Team (12-month lock)',
    token_unit: 'Tokens',
    token_feature_1_title: 'Deflationary Mechanism',
    token_feature_1_desc: 'Automatic token burns reduce supply over time, increasing scarcity and value.',
    token_feature_2_title: 'Staking Rewards',
    token_feature_2_desc: 'Earn passive income through our innovative staking pools and reward system.',
    token_feature_3_title: 'DAO Governance',
    token_feature_3_desc: 'Community-driven decisions through Decentralized Autonomous Organization (DAO) voting.',
    token_tax: 'Transaction Tax',
    months: 'Months',
    team_lock_period: 'Team Lock Period',
    blockchain_tech: 'Blockchain Tech',

    // === HOW TO BUY WIDGET METİNLERİ ===
    buy_title: 'How to Buy $PARROT',
    buy_desc: 'Follow these simple steps to secure your $PARROT tokens at the best price before the public launch!',
    buy_step_1_title: 'Step 1: Connect Your Wallet',
    buy_step_1_desc: 'Connect your MetaMask, Trust Wallet, or any Web3 wallet to our secure platform.',
    buy_step_2_title: 'Step 2: Choose Payment Method',
    buy_step_2_desc: 'Select your preferred payment method - Ethereum (ETH) or Tether (USDT).',
    buy_step_3_title: 'Step 3: Enter Purchase Amount',
    buy_step_3_desc: 'Enter the amount you want to invest and see how many $PARROT tokens you\'ll receive.',
    buy_step_4_title: 'Step 4: Confirm Transaction',
    buy_step_4_desc: 'Review your transaction details and confirm your purchase with a single click.',
    buy_step_5_title: 'Step 5: Claim Your Tokens',
    buy_step_5_desc: 'After presale ends, claim your $PARROT tokens directly to your wallet.',
    info_1_title: 'Instant Transaction Processing',
    info_1_desc: 'Your transaction is processed immediately with blockchain confirmation.',
    info_2_title: 'Secure and Audited',
    info_2_desc: 'All transactions are secured by blockchain technology and smart contracts.',
    info_3_title: 'No Hidden Fees',
    info_3_desc: 'What you see is what you pay. Transparent pricing with absolutely no hidden fees.',
    cta_title: 'Ready to Get Started?',
    cta_desc: 'Join the presale now and secure your $PARROT tokens at the best price!',
    start_buying_now: 'Start Buying $PARROT Now',

    // === COMMUNITY WIDGET METİNLERİ ===
    community_title: 'Join the $PARROT Flock!',
    community_desc: 'Be part of the most vibrant and supportive community in crypto. Together, we\'re building something amazing!',
    stat_holders: 'Token Holders',
    stat_twitter: 'Twitter Followers',
    stat_telegram: 'Telegram Members',
    stat_growth: 'Growth This Month',
    milestones_title: 'Community Milestones & Rewards',
    milestone_10k: '10K Holders Reached',
    milestone_25k: '25K Holders Reached',
    milestone_50k: '50K Holders',
    milestone_100k: '100K Holders',
    reward_nft: 'Community NFT Drop',
    reward_staking: 'Staking Pool Launch',
    reward_cex: 'Major CEX Listing',
    reward_mainnet: 'Layer 2 Mainnet Launch',
    completed: 'COMPLETED',
    social_title: 'Connect with Our Community',
    follow_twitter: 'Follow on Twitter',
    join_telegram: 'Join Telegram',
    discord_server: 'Discord Server',
    testimonials_title: 'What Our Community Says',
    testimonial_1: "Best meme token community I've ever been part of! The team is transparent and the roadmap is amazing.",
    testimonial_2: "TOKEN PARROT is going to the moon! The Layer 2 technology and zero taxes make it a game changer.",
    testimonial_3: "Diamond hands all the way! This project has real utility and an incredible community behind it.",
    
    // === FOOTER WIDGET METİNLERİ ===
    footer_brand_desc: 'The most colorful and innovative meme token in the crypto jungle. Join our flock to squawk your way to financial freedom with zero taxes, lightning-fast transactions, and a vibrant community.',
    contract_address: 'Contract Address',
    join_our_flock: 'Join Our Flock',
    followers_label: 'followers',
    social_twitter: 'Twitter',
    social_telegram: 'Telegram',
    social_discord: 'Discord',
    security_trust_title: 'Security and Trust',
    audit_certik_title: 'Audited by CertiK',
    audit_solidproof_title: 'Audited by SolidProof',
    audit_smart_contract: 'Smart Contract Audit',
    security_verification: 'Security Verification',
    whitepaper_title: 'Whitepaper',
    technical_documentation: 'Technical Documentation',
    copyright_text: '© 2024 TOKEN PARROT. All rights reserved. Squawk responsibly! 🦜',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    disclaimer: 'Disclaimer',
    disclaimer_warning_title: 'Important Disclaimer',
    disclaimer_text: '$PARROT is a meme token created primarily for entertainment and community purposes. Cryptocurrency investments carry significant risk and high volatility. Please invest responsibly and only what you can afford to lose. This website and its content do not constitute financial advice. Always conduct your own research (DYOR) before making any investment decisions. Past performance does not guarantee future results. By purchasing $PARROT tokens, you acknowledge and accept these risks.',
  }
};
// Bu, Fast Refresh uyarısını gidermek için yapıldı:
export const defaultTranslations = translations; 


// Tip tanımları
type Lang = keyof typeof defaultTranslations;
type TranslationKey = keyof typeof defaultTranslations.tr;

interface LocalizationContextType {
  lang: Lang;
  setLang: (language: Lang) => void;
  t: (key: TranslationKey) => string;
}

// Bağlamı oluşturma
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Dil sağlayıcı (Provider) bileşeni
export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Başlangıç dilini yerel depolamadan veya varsayılan olarak 'tr' al
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'tr';
  });

  // Dil değiştiğinde yerel depolamayı güncelle
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Tercüme fonksiyonu
  const t = (key: TranslationKey): string => {
    // Önce mevcut dilde, sonra İngilizce'de arar, yoksa anahtarı döndürür
    return defaultTranslations[lang][key] || defaultTranslations.en[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Hook: Bileşenlerin kullanması için
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
