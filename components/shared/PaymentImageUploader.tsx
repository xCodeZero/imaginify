"use client";

import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/utils";

type PaymentImageUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const PaymentImageUploader = ({
  onValueChange,
  setImage,
}: PaymentImageUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      // publicId: result?.info?.public_id,
      // width: result?.info?.width,
      // height: result?.info?.height,
      secureURL: result[0].url,
    }));

    // console.log(result[0].url);

    onValueChange(result[0].url);

    toast({
      title: "Image uploaded successfully",
      description: "Your proof of payment is ready to upload.",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="h3-bold text-dark-600">Upload proof of payment</h3>

      <UploadButton
        endpoint="imageUploader"
        className="media-uploader_cldImage"
        onClientUploadComplete={(res) => {
          // Do something with the response
          setImage(res[0].url);
          onUploadSuccessHandler(res);
          // toast({
          //   title: "Image uploaded successfully",
          //   description: `${res[0].name}`,
          //   duration: 5000,
          //   className: "success-toast",
          // });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          //alert(`ERROR! ${error.message}`);
          onUploadErrorHandler();
        }}
      />
    </div>
  );
};

export default PaymentImageUploader;
