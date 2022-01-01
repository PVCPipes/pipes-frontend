import { useLottie } from "lottie-react";

export default function ({ data }) {
  const options = {
    animationData: data,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options);
  return View;
}
