import { DataSource, DeepPartial } from 'typeorm';

import { Product } from '@/models/product/entities/product.entity';

export const seedProduct = async (typeOrmDataSource: DataSource) => {
  const productRepository = typeOrmDataSource.getRepository(Product.name);

  const products: DeepPartial<Product>[] = [
    {
      name: 'Downy Fresh scent in the morning (1.1 liter)',
      description:
        'Downy fabric softener Special concentrated formula Fresh scent in the morning. Refill bag 1.1 liter.',
      price: 129.0,
      quantity: 100,
      imageUrl:
        'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/12/49/4902430245012/4902430245012_1-20230502155434-.jpg',
    },
    {
      name: 'Downy For drying clothes indoors (500 ml.)',
      description:
        'Downy fabric softener Special concentrated formula For drying clothes indoors, 500 ml.',
      price: 55.0,
      quantity: 100,
      imageUrl:
        'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/70/49/4902430867870/4902430867870_1-20231110194241-.jpg',
    },
    {
      name: 'Downy Premium Perfume (1.1 liter)',
      description:
        'Downy Premium Perfume fabric softener French lavender garden scent 1.1 liter.',
      price: 139.0,
      quantity: 100,
      imageUrl:
        'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/37/49/4987176079237/4987176079237_1-20230918135309-.jpg',
    },
    {
      name: 'Downy concentrated fabric softener (1.1 liter)',
      description:
        'Downy concentrated fabric softener, Mystique scent, 1100 ml., refill type.',
      price: 129.0,
      quantity: 100,
      imageUrl:
        'https://assets.tops.co.th/DOWNY-DownyConcentratedFabricSoftenerMystique1100mlRefill-4902430504560-1?$JPEG$',
    },
    {
      name: 'Downy from cotton flowers (500 ml.)',
      description:
        'Downy fabric softener Mild fragrance from cotton flowers, 500 ml.',
      price: 89.0,
      quantity: 100,
      imageUrl:
        'https://www.dohome.co.th/media/catalog/product/cache/e446f15aaa8dc66b80b7a0df334f7c5a/1/0/10403042_bag_p1.jpg',
    },
  ];

  const foundProducts = (await productRepository.find()) as Product[];

  const existingProducts = foundProducts.map((product) => product.name);

  const newProducts = products.filter(
    (product) => !existingProducts.includes(product.name),
  );

  if (newProducts.length > 0) {
    for (const product of newProducts) {
      const productEntity = productRepository.create(product);
      await productRepository.save(productEntity);
    }
  }

  console.log('Product seed completed');
};
