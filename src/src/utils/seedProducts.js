// src/utils/seedProducts.js
// Script para cadastrar produtos automaticamente baseado nas imagens

const productsData = [
  {
    name: "Óleo de Coco Extravirgem 500ml",
    price: 45.90,
    image: "/images/products/oleo-de-coco.webp",
    description: "Óleo de coco extravirgem 100% natural, prensado a frio. Ideal para culinária, hidratação da pele e cabelos. Rico em ácidos graxos essenciais.",
    category: "Óleos",
    stock: 50,
    benefits: ["Hidrata pele e cabelos", "Ideal para cozinhar", "100% natural", "Prensado a frio"]
  },
  {
    name: "Mel Silvestre Puro 500g",
    price: 38.90,
    image: "/images/products/mel-silvestre.webp",
    description: "Mel silvestre puro e natural, colhido de forma sustentável. Rico em nutrientes e antioxidantes. Sem adição de açúcares.",
    category: "Alimentos",
    stock: 35,
    benefits: ["100% puro", "Rico em antioxidantes", "Colheita sustentável", "Sem conservantes"]
  },
  {
    name: "Chá Verde Orgânico 100g",
    price: 29.90,
    image: "/images/products/cha-verde.webp",
    description: "Chá verde orgânico de alta qualidade. Auxilia no metabolismo e é rico em antioxidantes. Sabor suave e refrescante.",
    category: "Bebidas",
    stock: 60,
    benefits: ["Acelera metabolismo", "Rico em antioxidantes", "Orgânico certificado", "Sabor suave"]
  },
  {
    name: "Granola Artesanal 400g",
    price: 24.90,
    image: "/images/products/granola.webp",
    description: "Granola artesanal com mix de castanhas, aveia e frutas secas. Sem adição de açúcar refinado. Perfeita para o café da manhã.",
    category: "Alimentos",
    stock: 45,
    benefits: ["Sem açúcar refinado", "Rica em fibras", "Mix de castanhas", "Artesanal"]
  },
  {
    name: "Spirulina em Pó 200g",
    price: 79.90,
    image: "/images/products/spirulina.webp",
    description: "Spirulina em pó 100% pura. Superalimento rico em proteínas, vitaminas e minerais. Ideal para smoothies e sucos.",
    category: "Suplementos",
    stock: 30,
    benefits: ["Rica em proteínas", "Fonte de vitaminas", "100% natural", "Superalimento"]
  },
  {
    name: "Açaí Puro Congelado 1kg",
    price: 49.90,
    image: "/images/products/acai.webp",
    description: "Polpa de açaí puro congelado, sem adição de xaropes ou conservantes. Direto da Amazônia para sua casa.",
    category: "Alimentos",
    stock: 25,
    benefits: ["100% puro", "Sem conservantes", "Rico em antioxidantes", "Direto da Amazônia"]
  },
  {
    name: "Castanha do Pará 500g",
    price: 54.90,
    image: "/images/products/castanha-para.webp",
    description: "Castanhas do Pará selecionadas, ricas em selênio. Excelente fonte de energia e nutrientes essenciais.",
    category: "Alimentos",
    stock: 40,
    benefits: ["Rica em selênio", "Fonte de energia", "Selecionadas", "Nutritiva"]
  },
  {
    name: "Óleo Essencial de Lavanda 10ml",
    price: 35.90,
    image: "/images/products/oleo-lavanda.webp",
    description: "Óleo essencial de lavanda 100% puro. Propriedades calmantes e relaxantes. Ideal para aromaterapia.",
    category: "Óleos",
    stock: 55,
    benefits: ["100% puro", "Relaxante", "Aromaterapia", "Calmante natural"]
  },
  {
    name: "Whey Protein Vegano 900g",
    price: 149.90,
    image: "/images/products/whey-vegano.webp",
    description: "Proteína vegetal de alta qualidade, blend de ervilha e arroz. Ideal para atletas e praticantes de atividade física.",
    category: "Suplementos",
    stock: 20,
    benefits: ["100% vegano", "Alta proteína", "Sem lactose", "Blend premium"]
  },
  {
    name: "Própolis Verde 30ml",
    price: 42.90,
    image: "/images/products/propolis.webp",
    description: "Extrato de própolis verde brasileiro. Fortalece a imunidade e possui propriedades antibacterianas naturais.",
    category: "Suplementos",
    stock: 65,
    benefits: ["Fortalece imunidade", "Antibacteriano", "100% brasileiro", "Natural"]
  },
  {
    name: "Quinoa em Grãos 500g",
    price: 32.90,
    image: "/images/products/quinoa.webp",
    description: "Quinoa em grãos de alta qualidade. Superalimento rico em proteínas e aminoácidos essenciais.",
    category: "Alimentos",
    stock: 38,
    benefits: ["Rica em proteínas", "Aminoácidos essenciais", "Superalimento", "Versátil"]
  },
  {
    name: "Colágeno Hidrolisado 300g",
    price: 89.90,
    image: "/images/products/colageno.webp",
    description: "Colágeno hidrolisado em pó, fácil absorção. Auxilia na saúde da pele, cabelos, unhas e articulações.",
    category: "Suplementos",
    stock: 42,
    benefits: ["Fácil absorção", "Pele saudável", "Fortalece unhas", "Saúde articular"]
  },
  {
    name: "Semente de Chia 400g",
    price: 28.90,
    image: "/images/products/chia.webp",
    description: "Sementes de chia ricas em ômega-3 e fibras. Excelente para adicionar em sucos, iogurtes e receitas.",
    category: "Alimentos",
    stock: 70,
    benefits: ["Rica em ômega-3", "Alto teor de fibras", "Versátil", "Nutritiva"]
  },
  {
    name: "Vitamina C 1000mg 60 cáps",
    price: 39.90,
    image: "/images/products/vitamina-c.webp",
    description: "Vitamina C de alta concentração. Fortalece o sistema imunológico e possui ação antioxidante.",
    category: "Suplementos",
    stock: 80,
    benefits: ["Alta concentração", "Fortalece imunidade", "Antioxidante", "60 cápsulas"]
  },
  {
    name: "Azeite de Oliva Extra Virgem 500ml",
    price: 52.90,
    image: "/images/products/azeite.webp",
    description: "Azeite de oliva extra virgem importado. Prensado a frio, sabor suave e frutado. Ideal para saladas.",
    category: "Óleos",
    stock: 33,
    benefits: ["Extra virgem", "Prensado a frio", "Importado", "Sabor premium"]
  },
  {
    name: "Pasta de Amendoim Integral 500g",
    price: 26.90,
    image: "/images/products/pasta-amendoim.webp",
    description: "Pasta de amendoim 100% integral, sem adição de açúcar ou sal. Rica em proteínas e gorduras boas.",
    category: "Alimentos",
    stock: 48,
    benefits: ["100% integral", "Sem açúcar", "Rica em proteínas", "Gorduras boas"]
  },
  {
    name: "Magnésio Quelato 60 cáps",
    price: 45.90,
    image: "/images/products/magnesio.webp",
    description: "Magnésio quelato de alta absorção. Auxilia no relaxamento muscular e qualidade do sono.",
    category: "Suplementos",
    stock: 55,
    benefits: ["Alta absorção", "Relaxamento muscular", "Melhora o sono", "Quelato"]
  },
  {
    name: "Farinha de Amêndoas 300g",
    price: 44.90,
    image: "/images/products/farinha-amendoas.webp",
    description: "Farinha de amêndoas pura, ideal para receitas low carb e sem glúten. Rica em proteínas e fibras.",
    category: "Alimentos",
    stock: 28,
    benefits: ["Low carb", "Sem glúten", "Rica em proteínas", "Versátil"]
  },
  {
    name: "Cúrcuma em Pó 100g",
    price: 19.90,
    image: "/images/products/curcuma.webp",
    description: "Cúrcuma em pó 100% natural. Poderoso anti-inflamatório e antioxidante. Ideal para temperos e golden milk.",
    category: "Alimentos",
    stock: 90,
    benefits: ["Anti-inflamatório", "Antioxidante", "100% natural", "Versátil"]
  },
  {
    name: "Óleo de Linhaça 250ml",
    price: 34.90,
    image: "/images/products/oleo-linhaca.webp",
    description: "Óleo de linhaça prensado a frio, rico em ômega-3. Excelente para saladas e suplementação.",
    category: "Óleos",
    stock: 36,
    benefits: ["Rico em ômega-3", "Prensado a frio", "100% natural", "Nutritivo"]
  }
];

// Função para cadastrar os produtos no localStorage
export const seedProducts = () => {
  const existingProducts = localStorage.getItem('verdeNature_products');
  
  if (existingProducts && JSON.parse(existingProducts).length > 0) {
    console.log('⚠️ Já existem produtos cadastrados!');
    const confirm = window.confirm(
      'Já existem produtos cadastrados. Deseja substituir todos?\n\n' +
      'OK = Substituir tudo\n' +
      'Cancelar = Manter os existentes'
    );
    
    if (!confirm) {
      console.log('❌ Operação cancelada.');
      return false;
    }
  }

  // Adicionar ID e data de criação
  const productsWithId = productsData.map((product, index) => ({
    ...product,
    id: Date.now() + index,
    createdAt: new Date().toISOString()
  }));

  // Salvar no localStorage
  localStorage.setItem('verdeNature_products', JSON.stringify(productsWithId));
  
  console.log(`✅ ${productsWithId.length} produtos cadastrados com sucesso!`);
  return true;
};

// Função para listar produtos cadastrados
export const listProducts = () => {
  const products = localStorage.getItem('verdeNature_products');
  if (products) {
    const parsed = JSON.parse(products);
    console.table(parsed.map(p => ({
      id: p.id,
      nome: p.name,
      preço: `R$ ${p.price.toFixed(2)}`,
      categoria: p.category,
      estoque: p.stock
    })));
    return parsed;
  }
  console.log('❌ Nenhum produto cadastrado.');
  return [];
};

// Função para limpar todos os produtos
export const clearProducts = () => {
  localStorage.removeItem('verdeNature_products');
  console.log('🗑️ Todos os produtos foram removidos.');
};

export default productsData;