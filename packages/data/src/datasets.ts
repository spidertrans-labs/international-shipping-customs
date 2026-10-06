const SOURCES = {
  au: {
    abfRestricted:
      "https://www.abf.gov.au/importing-exporting-and-manufacturing/importing/prohibited-and-restricted-goods",
    daffGoods:
      "https://www.agriculture.gov.au/biosecurity-trade/import/goods",
    tgaPersonal:
      "https://www.tga.gov.au/products/unapproved-therapeutic-goods/access-pathways/personal-importation-scheme"
  },
  us: {
    cbpImport:
      "https://www.cbp.gov/trade/basic-import-export",
    fdaPersonal:
      "https://www.fda.gov/industry/import-basics/personal-importation",
    aphisPlants:
      "https://www.aphis.usda.gov/plant-health",
    fccEquipment:
      "https://www.fcc.gov/oet/ea/"
  },
  ca: {
    cbsaImport:
      "https://www.cbsa-asfc.gc.ca/import/menu-eng.html",
    cfiaImport:
      "https://inspection.canada.ca/en/importing-food-plants-animals",
    healthDrugs:
      "https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products.html",
    healthNhps:
      "https://www.canada.ca/en/health-canada/services/drugs-health-products/natural-non-prescription.html",
    healthCosmetics:
      "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics.html"
  },
  uk: {
    govImport:
      "https://www.gov.uk/import-goods-into-uk",
    govPersonal:
      "https://www.gov.uk/bringing-goods-into-uk-personal-use",
    govFood:
      "https://www.gov.uk/bringing-food-into-great-britain",
    aphaPlants:
      "https://www.gov.uk/guidance/import-plants-and-plant-products-from-non-eu-countries-to-great-britain",
    govMedicine:
      "https://www.gov.uk/guidance/import-a-human-medicine"
  }
} as const;

const common = {
  verifiedAt: "2026-10-07"
} as const;

export const datasets: unknown[] = [
  {
    country: {
      code: "AU",
      nameZh: "澳大利亚",
      nameEn: "Australia",
      currency: "AUD",
      authority: "Australian Border Force / DAFF / TGA",
      dutyThresholdZh:
        "低价值进口商品通常需要缴纳 10% GST；关税取决于货类、原产地和贸易协定，不能仅按申报价值判断。",
      dutyThresholdEn:
        "Most low-value imports are subject to 10% GST. Customs duty depends on the goods, origin, and applicable trade agreements.",
      taxNotesZh:
        "进口税费、清关服务费和承运商代垫费可能另行收取，最终金额以 ABF 与承运商核定为准。",
      taxNotesEn:
        "Import charges, clearance fees, and carrier advances may apply in addition to GST and duty.",
      declarationNotesZh:
        "如实申报品名、数量、材质和用途；食品、药品、动植物制品、烟酒及危险品必须提前核对入境要求。",
      declarationNotesEn:
        "Declare the item, quantity, materials, and use accurately. Check food, medicine, plant, animal, tobacco, alcohol, and dangerous-goods requirements before shipping.",
      sourceUrls: [SOURCES.au.abfRestricted, SOURCES.au.daffGoods, SOURCES.au.tgaPersonal],
      lastVerifiedAt: common.verifiedAt,
      disclaimerZh:
        "本结果为一般信息，不构成清关或法律意见；运输前请以澳大利亚官方最新规则和承运商要求为准。",
      disclaimerEn:
        "This is general information, not customs or legal advice. Confirm the latest Australian rules and carrier requirements before shipping."
    },
    items: [
      {
        id: "AU-01",
        country: "AU",
        category: "snacks",
        itemZh: "商业包装零食",
        itemEn: "Commercially packaged snacks",
        aliasesZh: ["饼干", "糖果", "方便食品"],
        aliasesEn: ["biscuits", "candy", "instant food"],
        status: "conditional",
        conditionsZh: "通常可寄送，但必须商业包装、标签完整、可长期保存，且不含肉类、蛋类、乳制品或违禁植物成分。",
        conditionsEn: "Generally permitted when commercially packaged, fully labelled, shelf-stable, and free of restricted meat, egg, dairy, or plant ingredients.",
        declarationNotesZh: "申报为零食或食品，写明主要成分；含肉、蛋、奶、蜂蜜或种子时需要单独核查。",
        declarationNotesEn: "Declare as snacks or food and list key ingredients. Products containing meat, egg, dairy, honey, or seeds require a separate check.",
        sourceUrl: SOURCES.au.daffGoods,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-02",
        country: "AU",
        category: "meat-dairy",
        itemZh: "肉类与乳制品",
        itemEn: "Meat and dairy products",
        aliasesZh: ["香肠", "牛肉干", "奶粉", "奶酪"],
        aliasesEn: ["sausage", "beef jerky", "milk powder", "cheese"],
        status: "restricted",
        conditionsZh: "多数个人携带或邮寄肉类、蛋类及部分乳制品受严格限制，通常要求进口许可、官方证书或来自批准国家。",
        conditionsEn: "Most personal imports of meat, egg, and many dairy products are tightly restricted and generally require a permit, official certificate, or approved-country status.",
        declarationNotesZh: "必须主动申报动物来源和加工方式，不要通过普通食品渠道隐瞒肉类或乳制品成分。",
        declarationNotesEn: "Declare the animal origin and processing method. Do not conceal meat or dairy ingredients in ordinary food shipments.",
        sourceUrl: SOURCES.au.daffGoods,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-03",
        country: "AU",
        category: "medicine",
        itemZh: "处方药与非处方药",
        itemEn: "Prescription and over-the-counter medicine",
        aliasesZh: ["感冒药", "处方药", "常用药"],
        aliasesEn: ["cold medicine", "prescription drugs", "personal medicine"],
        status: "conditional",
        conditionsZh: "个人自用药物可能适用 TGA 个人进口规则，数量通常不超过三个月，处方药需处方或医生说明。",
        conditionsEn: "Personal medicines may qualify under TGA personal import rules, generally limited to three months' supply. Prescription medicines require a prescription or doctor's explanation.",
        declarationNotesZh: "保留原包装、英文说明、处方和购买凭证；含受控成分的药物需要特别核查。",
        declarationNotesEn: "Keep original packaging, English instructions, prescriptions, and proof of purchase. Controlled ingredients require additional checks.",
        sourceUrl: SOURCES.au.tgaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-04",
        country: "AU",
        category: "supplements",
        itemZh: "保健营养品",
        itemEn: "Dietary supplements and vitamins",
        aliasesZh: ["维生素", "鱼油", "蛋白粉"],
        aliasesEn: ["vitamins", "fish oil", "protein powder"],
        status: "conditional",
        conditionsZh: "个人自用且数量合理时可寄送；成分属于治疗性商品、受控物质或动物制品时需要 TGA 或生物安全许可。",
        conditionsEn: "Reasonable personal quantities may be imported. Therapeutic claims, controlled substances, or animal-derived ingredients may require TGA or biosecurity approval.",
        declarationNotesZh: "申报产品名称、剂量、数量和用途，保留成分表与购买凭证。",
        declarationNotesEn: "Declare product name, dosage, quantity, and use. Keep the ingredient list and purchase receipt.",
        sourceUrl: SOURCES.au.tgaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-05",
        country: "AU",
        category: "cosmetics",
        itemZh: "化妆品与护肤品",
        itemEn: "Cosmetics and skincare",
        aliasesZh: ["面霜", "面膜", "香水"],
        aliasesEn: ["cream", "face mask", "perfume"],
        status: "conditional",
        conditionsZh: "普通个人自用化妆品通常可寄送，但受控成分、动物制品、压力罐、易燃液体和危险品可能需要许可或受限运输。",
        conditionsEn: "Ordinary personal cosmetics are usually permitted, but controlled ingredients, animal materials, aerosols, flammable liquids, and dangerous goods may require permits or special transport.",
        declarationNotesZh: "申报液体容量、酒精浓度和喷雾属性；含药品功效的成分需核对 TGA 规则。",
        declarationNotesEn: "Declare liquid volume, alcohol content, and aerosol status. Medicinal ingredients must be checked against TGA rules.",
        sourceUrl: SOURCES.au.abfRestricted,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-06",
        country: "AU",
        category: "batteries",
        itemZh: "锂电池与充电宝",
        itemEn: "Lithium batteries and power banks",
        aliasesZh: ["充电宝", "锂电池", "18650"],
        aliasesEn: ["power bank", "lithium battery", "Li-ion"],
        status: "restricted",
        conditionsZh: "属于危险品，空运、海运和快递规则不同；通常要求合规包装、UN 38.3 运输测试报告，并按承运商规则运输。",
        conditionsEn: "Lithium cells are dangerous goods. Air, sea, and courier rules differ and commonly require compliant packaging and UN 38.3 test evidence.",
        declarationNotesZh: "必须申报电池类型、瓦时、数量和独立包装情况，不得虚假申报为普通电子配件。",
        declarationNotesEn: "Declare battery chemistry, watt-hours, quantity, and packaging. Never declare batteries as ordinary electronics.",
        sourceUrl: SOURCES.au.abfRestricted,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-07",
        country: "AU",
        category: "electronics",
        itemZh: "普通电子产品",
        itemEn: "General consumer electronics",
        aliasesZh: ["手机", "电脑", "耳机"],
        aliasesEn: ["phone", "laptop", "headphones"],
        status: "allowed",
        conditionsZh: "一般可进口，但含有无线模块、锂电池、激光或加密功能的产品需满足澳大利亚电气、无线电和运输要求。",
        conditionsEn: "Generally importable, but wireless modules, batteries, lasers, and encryption features must meet Australian electrical, radio, and transport requirements.",
        declarationNotesZh: "申报品牌、型号、用途和是否含电池；高价值设备应保留购买凭证。",
        declarationNotesEn: "Declare brand, model, use, and battery content. Keep purchase evidence for high-value devices.",
        sourceUrl: SOURCES.au.abfRestricted,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-08",
        country: "AU",
        category: "alcohol-tobacco",
        itemZh: "酒精与烟草制品",
        itemEn: "Alcohol and tobacco products",
        aliasesZh: ["白酒", "香烟", "电子烟"],
        aliasesEn: ["spirits", "cigarettes", "vape"],
        status: "restricted",
        conditionsZh: "烟酒受严格限额、年龄、税费和许可要求限制；电子烟及尼古丁产品另有专门进口规定。",
        conditionsEn: "Alcohol and tobacco are limited by quantity, age, tax, and licensing rules. Vapes and nicotine products have separate import controls.",
        declarationNotesZh: "必须准确申报酒精浓度、容量、烟草重量和尼古丁含量，并取得承运前确认。",
        declarationNotesEn: "Declare alcohol strength, volume, tobacco weight, and nicotine content accurately, and confirm eligibility before dispatch.",
        sourceUrl: SOURCES.au.abfRestricted,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-09",
        country: "AU",
        category: "seeds-plants",
        itemZh: "种子、苗木与干花",
        itemEn: "Seeds, live plants, and dried botanicals",
        aliasesZh: ["茶叶", "种子", "干花", "中药植物"],
        aliasesEn: ["tea leaves", "seeds", "dried flowers", "herbal plants"],
        status: "prohibited",
        conditionsZh: "多数种子、活植物和植物繁殖材料默认禁止，除非持有进口许可并满足 BICON 条件及植物检疫证书。",
        conditionsEn: "Most seeds, live plants, and propagating material are prohibited unless an import permit, BICON conditions, and phytosanitary certification are satisfied.",
        declarationNotesZh: "未取得许可前不要邮寄；申报植物学名称、数量、用途和原产国。",
        declarationNotesEn: "Do not ship before obtaining any required permit. Declare botanical name, quantity, use, and country of origin.",
        sourceUrl: SOURCES.au.daffGoods,
        verifiedAt: common.verifiedAt
      },
      {
        id: "AU-10",
        country: "AU",
        category: "liquids-aerosols",
        itemZh: "液体与压力喷雾",
        itemEn: "Liquids and aerosols",
        aliasesZh: ["洗发水", "喷雾", "清洁剂"],
        aliasesEn: ["shampoo", "spray", "cleaner"],
        status: "conditional",
        conditionsZh: "普通日化液体通常可寄送；易燃、腐蚀性、毒性或加压喷雾属于危险品，运输方式和数量受到严格限制。",
        conditionsEn: "Ordinary household liquids may be shipped. Flammable, corrosive, toxic, or pressurized aerosols are dangerous goods with strict transport and quantity limits.",
        declarationNotesZh: "申报容量、成分、闪点和是否加压；不能用普通包裹掩盖危险品属性。",
        declarationNotesEn: "Declare volume, ingredients, flash point, and pressure status. Do not conceal dangerous-goods properties in ordinary parcels.",
        sourceUrl: SOURCES.au.abfRestricted,
        verifiedAt: common.verifiedAt
      }
    ]
  },
  {
    country: {
      code: "US",
      nameZh: "美国",
      nameEn: "United States",
      currency: "USD",
      authority: "U.S. Customs and Border Protection / FDA / USDA / FCC",
      dutyThresholdZh:
        "美国进口关税和低值货物待遇会随行政政策变化。发货前必须查看 CBP 当前 de minimis、关税和清关指引。",
      dutyThresholdEn:
        "U.S. import duty and low-value shipment treatment can change with administrative policy. Check current CBP de minimis, duty, and clearance guidance before dispatch.",
      taxNotesZh:
        "关税、州税、MPF、承运商清关费和代垫费可能单独收取，申报价值应反映真实交易或合理价值。",
      taxNotesEn:
        "Duty, state tax, merchandise processing fees, brokerage, and advances may be billed separately. Declared value must reflect the transaction or a reasonable value.",
      declarationNotesZh:
        "收件人和寄件人信息必须完整；食品、药品、动植物、电子设备、烟酒和危险品需要对应的 FDA、USDA 或 FCC 合规材料。",
      declarationNotesEn:
        "Provide complete sender and recipient details. Food, drugs, plants, animals, electronics, alcohol, tobacco, and dangerous goods may require FDA, USDA, or FCC compliance.",
      sourceUrls: [SOURCES.us.cbpImport, SOURCES.us.fdaPersonal, SOURCES.us.aphisPlants],
      lastVerifiedAt: common.verifiedAt,
      disclaimerZh:
        "美国进口规则变化频繁，本结果为一般信息，不构成报关、税务或法律意见。",
      disclaimerEn:
        "U.S. import rules change frequently. This is general information, not customs, tax, or legal advice."
    },
    items: [
      {
        id: "US-01",
        country: "US",
        category: "snacks",
        itemZh: "商业包装零食",
        itemEn: "Commercially packaged snacks",
        aliasesZh: ["饼干", "糖果", "辣条"],
        aliasesEn: ["cookies", "candy", "snack food"],
        status: "conditional",
        conditionsZh: "通常允许个人进口，但食品须安全、标签真实；含肉、蛋、奶或未申报过敏原的产品可能被扣留。",
        conditionsEn: "Personal imports are generally possible when food is safe and truthfully labelled. Products with meat, egg, dairy, or undeclared allergens may be detained.",
        declarationNotesZh: "申报食品名称、成分、数量和用途；部分食品需 FDA Prior Notice。",
        declarationNotesEn: "Declare food name, ingredients, quantity, and use. Some foods require FDA Prior Notice.",
        sourceUrl: SOURCES.us.fdaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-02",
        country: "US",
        category: "meat-dairy",
        itemZh: "肉类与乳制品",
        itemEn: "Meat and dairy products",
        aliasesZh: ["牛肉干", "香肠", "奶粉", "奶酪"],
        aliasesEn: ["beef jerky", "sausage", "milk powder", "cheese"],
        status: "restricted",
        conditionsZh: "动物源食品受 USDA 和 FDA 管制，许多商业肉类、家禽及乳制品要求出口国资质、许可或证书。",
        conditionsEn: "Animal-derived foods are regulated by USDA and FDA. Many commercial meat, poultry, and dairy products require country eligibility, permits, or certificates.",
        declarationNotesZh: "必须申报动物种类、加工方式、原产国和商业包装状态。",
        declarationNotesEn: "Declare animal species, processing method, country of origin, and commercial packaging status.",
        sourceUrl: SOURCES.us.fdaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-03",
        country: "US",
        category: "medicine",
        itemZh: "处方药与非处方药",
        itemEn: "Prescription and over-the-counter medicine",
        aliasesZh: ["处方药", "感冒药", "常用药"],
        aliasesEn: ["prescription medicine", "cold medicine", "personal drugs"],
        status: "restricted",
        conditionsZh: "个人进口药品条件严格，通常要求美国执业医生处方、个人自用数量和 FDA 允许的药品类型。",
        conditionsEn: "Personal drug imports are tightly controlled and commonly require a U.S.-licensed practitioner's prescription, a personal-use quantity, and an FDA-permitted drug type.",
        declarationNotesZh: "保留原包装、英文处方、诊断和购买凭证；不得寄送未经批准的受控物质。",
        declarationNotesEn: "Keep original packaging, an English prescription, diagnosis, and purchase evidence. Do not ship unapproved controlled substances.",
        sourceUrl: SOURCES.us.fdaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-04",
        country: "US",
        category: "supplements",
        itemZh: "保健营养品",
        itemEn: "Dietary supplements",
        aliasesZh: ["维生素", "鱼油", "褪黑素"],
        aliasesEn: ["vitamins", "fish oil", "melatonin"],
        status: "conditional",
        conditionsZh: "个人合理用量通常可进口，但标签不得含未批准疾病治疗声明，受控或处方成分会受到限制。",
        conditionsEn: "Reasonable personal quantities are generally importable, but labels may not make unapproved disease-treatment claims and controlled or prescription ingredients are restricted.",
        declarationNotesZh: "申报产品、剂量、数量和用途，保留英文成分表和购买凭证。",
        declarationNotesEn: "Declare product, dosage, quantity, and use. Keep the English ingredient label and purchase evidence.",
        sourceUrl: SOURCES.us.fdaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-05",
        country: "US",
        category: "cosmetics",
        itemZh: "化妆品与护肤品",
        itemEn: "Cosmetics and skincare",
        aliasesZh: ["面霜", "口红", "香水"],
        aliasesEn: ["cream", "lipstick", "perfume"],
        status: "conditional",
        conditionsZh: "一般可进口，但必须安全、标签合规且不掺入禁用物质；药品功效产品按药品管理。",
        conditionsEn: "Generally importable when safe, properly labelled, and free of prohibited substances. Products making drug claims are regulated as drugs.",
        declarationNotesZh: "申报液体容量、酒精浓度和产品用途；香水与气雾剂受危险品运输规则约束。",
        declarationNotesEn: "Declare liquid volume, alcohol content, and intended use. Perfume and aerosols are subject to dangerous-goods transport rules.",
        sourceUrl: SOURCES.us.fdaPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-06",
        country: "US",
        category: "batteries",
        itemZh: "锂电池与充电宝",
        itemEn: "Lithium batteries and power banks",
        aliasesZh: ["充电宝", "锂电池", "18650"],
        aliasesEn: ["power bank", "lithium battery", "Li-ion"],
        status: "restricted",
        conditionsZh: "属于运输危险品，空运、海运和地面运输规则不同，一般需要合规包装与 UN 38.3 测试信息。",
        conditionsEn: "Lithium batteries are transport dangerous goods. Air, sea, and ground rules differ and commonly require compliant packaging and UN 38.3 evidence.",
        declarationNotesZh: "申报电池类型、瓦时、数量和包装方式，按承运商危险品规则操作。",
        declarationNotesEn: "Declare chemistry, watt-hours, quantity, and packaging. Follow the carrier's dangerous-goods rules.",
        sourceUrl: SOURCES.us.cbpImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-07",
        country: "US",
        category: "electronics",
        itemZh: "普通电子产品",
        itemEn: "General consumer electronics",
        aliasesZh: ["手机", "电脑", "路由器"],
        aliasesEn: ["phone", "computer", "router"],
        status: "conditional",
        conditionsZh: "一般可进口；无线发射设备须符合 FCC 设备授权规则，含锂电池时还需满足运输要求。",
        conditionsEn: "Generally importable. Radio-frequency devices must comply with FCC equipment authorization rules, and battery-powered devices must meet transport requirements.",
        declarationNotesZh: "申报品牌、型号、用途和无线功能，保留合规声明或购买凭证。",
        declarationNotesEn: "Declare brand, model, use, and wireless capability. Keep compliance statements or purchase evidence.",
        sourceUrl: SOURCES.us.fccEquipment,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-08",
        country: "US",
        category: "alcohol-tobacco",
        itemZh: "酒精与烟草制品",
        itemEn: "Alcohol and tobacco products",
        aliasesZh: ["白酒", "香烟", "电子烟"],
        aliasesEn: ["spirits", "cigarettes", "vape"],
        status: "restricted",
        conditionsZh: "受联邦税、州法、年龄、许可和承运限制；电子烟及尼古丁产品另有严格进口和销售规则。",
        conditionsEn: "Subject to federal tax, state law, age, licensing, and carrier restrictions. Vapes and nicotine products face separate import and sales controls.",
        declarationNotesZh: "必须准确申报酒精、烟草或尼古丁含量和数量，并在发货前确认收货州规则。",
        declarationNotesEn: "Accurately declare alcohol, tobacco, or nicotine content and quantity. Confirm destination-state rules before dispatch.",
        sourceUrl: SOURCES.us.cbpImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-09",
        country: "US",
        category: "seeds-plants",
        itemZh: "种子、苗木与植物制品",
        itemEn: "Seeds, plants, and plant products",
        aliasesZh: ["茶叶", "种子", "中药材"],
        aliasesEn: ["tea leaves", "seeds", "herbal medicine"],
        status: "restricted",
        conditionsZh: "多数植物、种子和繁殖材料需要 USDA APHIS 许可、检疫证书或指定口岸入境。",
        conditionsEn: "Most plants, seeds, and propagating material require USDA APHIS permits, phytosanitary certificates, or entry through designated ports.",
        declarationNotesZh: "申报植物学名称、原产国和用途；未获批前不要发货。",
        declarationNotesEn: "Declare botanical name, country of origin, and use. Do not ship before required approval.",
        sourceUrl: SOURCES.us.aphisPlants,
        verifiedAt: common.verifiedAt
      },
      {
        id: "US-10",
        country: "US",
        category: "liquids-aerosols",
        itemZh: "液体与压力喷雾",
        itemEn: "Liquids and aerosols",
        aliasesZh: ["洗发水", "喷雾", "清洁剂"],
        aliasesEn: ["shampoo", "spray", "cleaner"],
        status: "conditional",
        conditionsZh: "普通日化液体通常可寄送；易燃、腐蚀、有毒或加压产品属于危险品并受承运限制。",
        conditionsEn: "Ordinary household liquids are usually acceptable. Flammable, corrosive, toxic, or pressurized goods are dangerous goods with carrier restrictions.",
        declarationNotesZh: "申报容量、成分、闪点和压力属性，不得以普通日用品名义隐瞒危险品。",
        declarationNotesEn: "Declare volume, ingredients, flash point, and pressure. Do not conceal dangerous goods as ordinary household products.",
        sourceUrl: SOURCES.us.cbpImport,
        verifiedAt: common.verifiedAt
      }
    ]
  },
  {
    country: {
      code: "CA",
      nameZh: "加拿大",
      nameEn: "Canada",
      currency: "CAD",
      authority: "CBSA / CFIA / Health Canada",
      dutyThresholdZh:
        "CBSA 根据货值、原产地、货类和进口方式评估关税与税费；低值快递计划也有申报和资格条件。",
      dutyThresholdEn:
        "The CBSA assesses duty and taxes based on value, origin, goods, and import method. Low-value courier programs also have declaration and eligibility conditions.",
      taxNotesZh:
        "关税、GST/HST、省税、报关服务费和承运商垫付费可能另行收取。",
      taxNotesEn:
        "Duty, GST/HST, provincial tax, brokerage, and carrier advances may be charged separately.",
      declarationNotesZh:
        "食品、动植物、药品、天然健康产品、化妆品、烟酒和危险品需要主动申报并提供真实用途和成分。",
      declarationNotesEn:
        "Food, plants, animals, drugs, natural health products, cosmetics, alcohol, tobacco, and dangerous goods must be declared with accurate use and ingredients.",
      sourceUrls: [SOURCES.ca.cbsaImport, SOURCES.ca.cfiaImport, SOURCES.ca.healthDrugs],
      lastVerifiedAt: common.verifiedAt,
      disclaimerZh:
        "加拿大进口规则还可能受省、地区和原产国限制，本结果为一般信息。",
      disclaimerEn:
        "Canadian rules may also vary by province, territory, and country of origin. This is general information."
    },
    items: [
      {
        id: "CA-01",
        country: "CA",
        category: "snacks",
        itemZh: "商业包装零食",
        itemEn: "Commercially packaged snacks",
        aliasesZh: ["饼干", "糖果", "方便面"],
        aliasesEn: ["cookies", "candy", "instant noodles"],
        status: "conditional",
        conditionsZh: "通常可寄送，但食品须安全、标签真实，含肉、蛋、奶或特定植物成分时受 CFIA 限制。",
        conditionsEn: "Generally shippable when safe and truthfully labelled. Products with meat, egg, dairy, or certain plant ingredients are subject to CFIA controls.",
        declarationNotesZh: "申报食品名称、主要成分和数量，避免将含肉蛋奶产品写成普通零食。",
        declarationNotesEn: "Declare food name, key ingredients, and quantity. Do not describe meat, egg, or dairy products as ordinary snacks.",
        sourceUrl: SOURCES.ca.cfiaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-02",
        country: "CA",
        category: "meat-dairy",
        itemZh: "肉类与乳制品",
        itemEn: "Meat and dairy products",
        aliasesZh: ["牛肉干", "香肠", "奶粉", "奶酪"],
        aliasesEn: ["beef jerky", "sausage", "milk powder", "cheese"],
        status: "restricted",
        conditionsZh: "多数商业肉、蛋、乳制品需要许可证、官方证书或来自批准来源，个人邮寄限制严格。",
        conditionsEn: "Most commercial meat, egg, and dairy products require permits, official certificates, or approved sources. Personal shipments are tightly restricted.",
        declarationNotesZh: "申报动物种类、原产国、加工方式和包装类型。",
        declarationNotesEn: "Declare animal species, country of origin, processing method, and packaging type.",
        sourceUrl: SOURCES.ca.cfiaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-03",
        country: "CA",
        category: "medicine",
        itemZh: "处方药与非处方药",
        itemEn: "Prescription and over-the-counter medicine",
        aliasesZh: ["处方药", "感冒药", "常用药"],
        aliasesEn: ["prescription medicine", "cold medicine", "personal drugs"],
        status: "restricted",
        conditionsZh: "个人进口药物通常限自用、酒店或 90 天用量，处方药需要处方或医生说明，受控物质另行管制。",
        conditionsEn: "Personal drug imports are generally limited to personal use, accompanying travellers, or a 90-day supply. Prescription drugs need a prescription or doctor's statement; controlled substances face separate controls.",
        declarationNotesZh: "保留原包装、英文处方与购买凭证，不得通过快递隐瞒处方药。",
        declarationNotesEn: "Keep original packaging, an English prescription, and proof of purchase. Do not conceal prescription drugs in parcels.",
        sourceUrl: SOURCES.ca.healthDrugs,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-04",
        country: "CA",
        category: "supplements",
        itemZh: "天然健康产品与营养品",
        itemEn: "Natural health products and supplements",
        aliasesZh: ["维生素", "鱼油", "褪黑素"],
        aliasesEn: ["vitamins", "fish oil", "melatonin"],
        status: "conditional",
        conditionsZh: "合理个人用量通常可进口；成分必须在加拿大允许范围，标签不得含未经批准的疗效声明。",
        conditionsEn: "Reasonable personal quantities are usually importable. Ingredients must be permitted in Canada and labels may not contain unapproved health claims.",
        declarationNotesZh: "申报产品、成分、剂量和数量，保留英文标签和购买凭证。",
        declarationNotesEn: "Declare product, ingredients, dosage, and quantity. Keep the English label and proof of purchase.",
        sourceUrl: SOURCES.ca.healthNhps,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-05",
        country: "CA",
        category: "cosmetics",
        itemZh: "化妆品与护肤品",
        itemEn: "Cosmetics and skincare",
        aliasesZh: ["面霜", "口红", "香水"],
        aliasesEn: ["cream", "lipstick", "perfume"],
        status: "conditional",
        conditionsZh: "个人自用通常可寄送，但成分安全、标签和进口用途必须符合加拿大要求；药用功效产品按药品管理。",
        conditionsEn: "Personal-use cosmetics may generally be shipped, but ingredient safety, labelling, and intended use must comply with Canadian rules. Drug-like products are regulated as drugs.",
        declarationNotesZh: "申报产品用途、液体容量和酒精含量；喷雾与易燃液体需遵守危险品规则。",
        declarationNotesEn: "Declare intended use, liquid volume, and alcohol content. Aerosols and flammable liquids must follow dangerous-goods rules.",
        sourceUrl: SOURCES.ca.healthCosmetics,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-06",
        country: "CA",
        category: "batteries",
        itemZh: "锂电池与充电宝",
        itemEn: "Lithium batteries and power banks",
        aliasesZh: ["充电宝", "锂电池", "18650"],
        aliasesEn: ["power bank", "lithium battery", "Li-ion"],
        status: "restricted",
        conditionsZh: "属于危险品，运输须遵守加拿大危险品和承运商规则，通常要求合规包装与 UN 38.3 资料。",
        conditionsEn: "Dangerous goods. Transport must follow Canadian dangerous-goods and carrier rules, generally including compliant packaging and UN 38.3 documentation.",
        declarationNotesZh: "申报瓦时、数量、电池状态和包装方式，禁止虚假申报。",
        declarationNotesEn: "Declare watt-hours, quantity, battery condition, and packaging. False declarations are prohibited.",
        sourceUrl: SOURCES.ca.cbsaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-07",
        country: "CA",
        category: "electronics",
        itemZh: "普通电子产品",
        itemEn: "General consumer electronics",
        aliasesZh: ["手机", "电脑", "路由器"],
        aliasesEn: ["phone", "computer", "router"],
        status: "conditional",
        conditionsZh: "一般可进口；无线设备需符合加拿大无线电法规，含电池产品还需满足运输要求。",
        conditionsEn: "Generally importable. Wireless devices must meet Canadian radio requirements, and battery-powered items must satisfy transport rules.",
        declarationNotesZh: "申报品牌、型号、网络功能和电池信息，保留购买凭证。",
        declarationNotesEn: "Declare brand, model, network capability, and battery information. Keep purchase evidence.",
        sourceUrl: SOURCES.ca.cbsaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-08",
        country: "CA",
        category: "alcohol-tobacco",
        itemZh: "酒精与烟草制品",
        itemEn: "Alcohol and tobacco products",
        aliasesZh: ["白酒", "香烟", "电子烟"],
        aliasesEn: ["spirits", "cigarettes", "vape"],
        status: "restricted",
        conditionsZh: "受联邦税、省和地区酒类管制、年龄、数量和许可限制；尼古丁产品另有专门规定。",
        conditionsEn: "Subject to federal tax, provincial or territorial liquor controls, age, quantity, and licensing restrictions. Nicotine products have separate requirements.",
        declarationNotesZh: "准确申报品类、容量、酒精度或尼古丁含量，并在发货前确认目的省规则。",
        declarationNotesEn: "Accurately declare type, volume, alcohol strength, or nicotine content. Confirm destination-province rules before dispatch.",
        sourceUrl: SOURCES.ca.cbsaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-09",
        country: "CA",
        category: "seeds-plants",
        itemZh: "种子、苗木与植物制品",
        itemEn: "Seeds, plants, and plant products",
        aliasesZh: ["种子", "茶叶", "中药材"],
        aliasesEn: ["seeds", "tea", "herbal medicine"],
        status: "restricted",
        conditionsZh: "多数植物和种子需要 CFIA 许可、植物检疫证书或符合特定进口计划。",
        conditionsEn: "Most plants and seeds require CFIA permits, phytosanitary certificates, or compliance with a specific import program.",
        declarationNotesZh: "申报植物学名称、原产国、数量和用途；未获批前不要发货。",
        declarationNotesEn: "Declare botanical name, country of origin, quantity, and use. Do not ship before approval.",
        sourceUrl: SOURCES.ca.cfiaImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "CA-10",
        country: "CA",
        category: "liquids-aerosols",
        itemZh: "液体与压力喷雾",
        itemEn: "Liquids and aerosols",
        aliasesZh: ["洗发水", "喷雾", "清洁剂"],
        aliasesEn: ["shampoo", "spray", "cleaner"],
        status: "conditional",
        conditionsZh: "普通日化液体通常可寄送；易燃、腐蚀、有毒和加压产品属于危险品并受运输限制。",
        conditionsEn: "Ordinary household liquids are usually acceptable. Flammable, corrosive, toxic, and pressurized goods are dangerous goods with transport restrictions.",
        declarationNotesZh: "申报容量、成分、闪点和压力属性，遵守承运商限制。",
        declarationNotesEn: "Declare volume, ingredients, flash point, and pressure. Follow carrier restrictions.",
        sourceUrl: SOURCES.ca.cbsaImport,
        verifiedAt: common.verifiedAt
      }
    ]
  },
  {
    country: {
      code: "UK",
      nameZh: "英国",
      nameEn: "United Kingdom",
      currency: "GBP",
      authority: "HMRC / GOV.UK / FSA / APHA",
      dutyThresholdZh:
        "英国关税和 VAT 根据货值、原产地、货类和减免资格计算，个人进口与礼品规则不同。",
      dutyThresholdEn:
        "UK duty and VAT depend on value, origin, goods, and relief eligibility. Personal imports and gifts follow different rules.",
      taxNotesZh:
        "VAT、关税、清关服务费和承运商代垫费可能另行收取，低价商品也可能产生处理费。",
      taxNotesEn:
        "VAT, duty, clearance fees, and carrier advances may apply separately. Even low-value goods may incur handling charges.",
      declarationNotesZh:
        "如实描述货品、价值、原产地和用途；食品、动植物、药品、烟酒和危险品需要额外合规检查。",
      declarationNotesEn:
        "Describe goods, value, origin, and use accurately. Food, plants, animals, medicine, alcohol, tobacco, and dangerous goods require additional checks.",
      sourceUrls: [SOURCES.uk.govImport, SOURCES.uk.govPersonal, SOURCES.uk.govFood],
      lastVerifiedAt: common.verifiedAt,
      disclaimerZh:
        "英国规则可能因英格兰、苏格兰、威尔士或北爱尔兰而不同，本结果为一般信息。",
      disclaimerEn:
        "UK rules may differ across England, Scotland, Wales, and Northern Ireland. This is general information."
    },
    items: [
      {
        id: "UK-01",
        country: "UK",
        category: "snacks",
        itemZh: "商业包装零食",
        itemEn: "Commercially packaged snacks",
        aliasesZh: ["饼干", "糖果", "方便面"],
        aliasesEn: ["cookies", "candy", "instant noodles"],
        status: "conditional",
        conditionsZh: "部分包装食品可个人进口，但含肉、蛋、奶或高风险动物成分的产品可能被禁止或限制。",
        conditionsEn: "Some packaged foods may be imported for personal use, but products containing meat, egg, dairy, or high-risk animal ingredients may be prohibited or restricted.",
        declarationNotesZh: "申报食品名称、成分、数量和价值，保留商业包装和英文标签。",
        declarationNotesEn: "Declare food name, ingredients, quantity, and value. Keep commercial packaging and an English label.",
        sourceUrl: SOURCES.uk.govFood,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-02",
        country: "UK",
        category: "meat-dairy",
        itemZh: "肉类与乳制品",
        itemEn: "Meat and dairy products",
        aliasesZh: ["牛肉干", "香肠", "奶粉", "奶酪"],
        aliasesEn: ["beef jerky", "sausage", "milk powder", "cheese"],
        status: "prohibited",
        conditionsZh: "多数非欧盟来源肉类、蛋类和部分乳制品不得作为个人食品带入或邮寄，例外需满足官方证书或批准条件。",
        conditionsEn: "Most meat, egg, and certain dairy products from non-EU sources are prohibited as personal food imports. Exceptions require official certification or approved conditions.",
        declarationNotesZh: "不要将受限动物制品隐藏在普通食品中；申报原产国和动物成分。",
        declarationNotesEn: "Do not hide restricted animal products in ordinary food. Declare country of origin and animal ingredients.",
        sourceUrl: SOURCES.uk.govFood,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-03",
        country: "UK",
        category: "medicine",
        itemZh: "处方药与非处方药",
        itemEn: "Prescription and over-the-counter medicine",
        aliasesZh: ["处方药", "感冒药", "常用药"],
        aliasesEn: ["prescription medicine", "cold medicine", "personal drugs"],
        status: "restricted",
        conditionsZh: "个人进口药品需要合理自用数量、处方或医生说明，受控药物和未经批准药品限制更严。",
        conditionsEn: "Personal medicine imports require a reasonable personal supply, prescription, or doctor's statement. Controlled and unlicensed medicines face stricter controls.",
        declarationNotesZh: "保留原包装、处方和英文说明；不得通过隐瞒用途规避药品许可。",
        declarationNotesEn: "Keep original packaging, prescription, and English instructions. Do not conceal the intended medicinal use.",
        sourceUrl: SOURCES.uk.govMedicine,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-04",
        country: "UK",
        category: "supplements",
        itemZh: "保健营养品",
        itemEn: "Dietary supplements",
        aliasesZh: ["维生素", "鱼油", "褪黑素"],
        aliasesEn: ["vitamins", "fish oil", "melatonin"],
        status: "conditional",
        conditionsZh: "个人合理数量通常可进口，但成分、剂量和疗效声明须符合英国食品或药品法规。",
        conditionsEn: "Reasonable personal quantities are generally importable, but ingredients, dosage, and health claims must comply with UK food or medicine rules.",
        declarationNotesZh: "申报产品、成分、剂量、数量和用途，保留英文标签。",
        declarationNotesEn: "Declare product, ingredients, dosage, quantity, and use. Keep the English label.",
        sourceUrl: SOURCES.uk.govPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-05",
        country: "UK",
        category: "cosmetics",
        itemZh: "化妆品与护肤品",
        itemEn: "Cosmetics and skincare",
        aliasesZh: ["面霜", "口红", "香水"],
        aliasesEn: ["cream", "lipstick", "perfume"],
        status: "conditional",
        conditionsZh: "个人自用通常可寄送，但成分、标签和安全要求必须符合英国法规；药品功效产品按药品管理。",
        conditionsEn: "Personal-use cosmetics are generally shippable, but ingredients, labelling, and safety must meet UK rules. Drug-like products are regulated as medicines.",
        declarationNotesZh: "申报液体容量、酒精浓度和用途；香水、喷雾和易燃液体受危险品运输限制。",
        declarationNotesEn: "Declare volume, alcohol content, and use. Perfume, aerosols, and flammable liquids face dangerous-goods transport restrictions.",
        sourceUrl: SOURCES.uk.govPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-06",
        country: "UK",
        category: "batteries",
        itemZh: "锂电池与充电宝",
        itemEn: "Lithium batteries and power banks",
        aliasesZh: ["充电宝", "锂电池", "18650"],
        aliasesEn: ["power bank", "lithium battery", "Li-ion"],
        status: "restricted",
        conditionsZh: "属于危险品，空运、海运和陆运规则不同，通常要求合规包装和 UN 38.3 测试信息。",
        conditionsEn: "Dangerous goods. Air, sea, and road rules differ and generally require compliant packaging and UN 38.3 evidence.",
        declarationNotesZh: "申报瓦时、数量、电池状态和包装方式，按承运商规则运输。",
        declarationNotesEn: "Declare watt-hours, quantity, battery condition, and packaging. Follow carrier rules.",
        sourceUrl: SOURCES.uk.govImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-07",
        country: "UK",
        category: "electronics",
        itemZh: "普通电子产品",
        itemEn: "General consumer electronics",
        aliasesZh: ["手机", "电脑", "路由器"],
        aliasesEn: ["phone", "computer", "router"],
        status: "conditional",
        conditionsZh: "一般可进口；无线、电气、激光或含电池产品需符合英国产品安全和运输要求。",
        conditionsEn: "Generally importable, but wireless, electrical, laser, or battery-powered products must meet UK safety and transport requirements.",
        declarationNotesZh: "申报品牌、型号、价值、用途和电池信息，保留购买凭证。",
        declarationNotesEn: "Declare brand, model, value, use, and battery information. Keep purchase evidence.",
        sourceUrl: SOURCES.uk.govImport,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-08",
        country: "UK",
        category: "alcohol-tobacco",
        itemZh: "酒精与烟草制品",
        itemEn: "Alcohol and tobacco products",
        aliasesZh: ["白酒", "香烟", "电子烟"],
        aliasesEn: ["spirits", "cigarettes", "vape"],
        status: "restricted",
        conditionsZh: "受关税、VAT、数量、年龄和承运限制；电子烟及尼古丁产品另有专门规定。",
        conditionsEn: "Subject to duty, VAT, quantity, age, and carrier restrictions. Vapes and nicotine products have separate requirements.",
        declarationNotesZh: "准确申报容量、酒精度、烟草重量或尼古丁含量并缴纳税费。",
        declarationNotesEn: "Accurately declare volume, alcohol strength, tobacco weight, or nicotine content and pay applicable taxes.",
        sourceUrl: SOURCES.uk.govPersonal,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-09",
        country: "UK",
        category: "seeds-plants",
        itemZh: "种子、苗木与植物制品",
        itemEn: "Seeds, plants, and plant products",
        aliasesZh: ["种子", "茶叶", "中药材"],
        aliasesEn: ["seeds", "tea", "herbal medicine"],
        status: "restricted",
        conditionsZh: "许多植物和种子需要植物检疫证书、进口许可或满足特定来源国条件。",
        conditionsEn: "Many plants and seeds require a phytosanitary certificate, import permit, or compliance with country-of-origin conditions.",
        declarationNotesZh: "申报植物学名称、原产国、数量和用途；未获批前不要发货。",
        declarationNotesEn: "Declare botanical name, country of origin, quantity, and use. Do not ship before approval.",
        sourceUrl: SOURCES.uk.aphaPlants,
        verifiedAt: common.verifiedAt
      },
      {
        id: "UK-10",
        country: "UK",
        category: "liquids-aerosols",
        itemZh: "液体与压力喷雾",
        itemEn: "Liquids and aerosols",
        aliasesZh: ["洗发水", "喷雾", "清洁剂"],
        aliasesEn: ["shampoo", "spray", "cleaner"],
        status: "conditional",
        conditionsZh: "普通日化液体通常可寄送；易燃、腐蚀、有毒和加压产品属于危险品并受运输限制。",
        conditionsEn: "Ordinary household liquids are usually acceptable. Flammable, corrosive, toxic, and pressurized goods are dangerous goods with transport restrictions.",
        declarationNotesZh: "申报容量、成分、闪点和压力属性，遵守承运商限制。",
        declarationNotesEn: "Declare volume, ingredients, flash point, and pressure. Follow carrier restrictions.",
        sourceUrl: SOURCES.uk.govImport,
        verifiedAt: common.verifiedAt
      }
    ]
  }
];
