interface aboutProductDataType {
  productId: number;
  productName: string;
  productAvailableStocks: number;
  productDescription: string;
  productPrice: number;
  productDiscountPrice: number;
  productMainImage: string;
  productOtherImage: string;
  productWeight: number;
  productDimensions: string;
  productRatings: number;
  productTotalItemSold: number;
}

interface childProp {
  description: aboutProductDataType | null;
}

const ItemsDesc: React.FC<childProp> = ({ description }) => {
  if (!description) {
    return <p>No product description available.</p>;
  } else {
    return (
      <>
        <div className="pb-2">
          <p>{description.productDescription}</p>
        </div>
      </>
    );
  }
};

export default ItemsDesc;
