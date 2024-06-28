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
  specification: aboutProductDataType | null;
}

const ItemsSpecifics: React.FC<childProp> = ({ specification }) => {
  if (!specification) {
    return <p>No product specification available.</p>;
  } else {
    return (
      <>
        <div className="pb-2">
          <p>
            Product ID:{" "}
            <span className="inline-block w-20">{specification.productId}</span>
          </p>
          <p>
            Product weight:{" "}
            <span className="inline-block w-20">
              {specification.productWeight} Kg
            </span>
          </p>
          <p>
            Dimensions:{" "}
            <span className="inline-block w-35">
              {specification.productDimensions}
            </span>
          </p>
        </div>
      </>
    );
  }
};

export default ItemsSpecifics;
