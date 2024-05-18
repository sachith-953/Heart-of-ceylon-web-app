import MaxWidthWrapper from "./MaxWidthWrapper";

export default function CustomerService() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="p-8 bg-neutral-300 space-y-4">
          <div className="font-bold text-center">
            <p>
              Have questions about Sri Lankan Export Products, Exporters,
              Suppliers, and the Export process?
            </p>
            <p>
              Contact "Heart of Ceylon" Customer service for further assistance.
            </p>
          </div>
          <div className="grid grid-cols-3">
            <div className="justify-self-center ">
              <p>Call: +94 81 123 4567</p>
            </div>
            <div className="justify-self-center ">
              <p>E-mail: heartofceylonsupport@gmail.com</p>
            </div>
            <div className="justify-self-center ">
                <p>Messenger</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}