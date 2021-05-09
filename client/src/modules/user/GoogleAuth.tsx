import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GoogleIcon } from "../../components/icons/GoogleIcon";
import mainApi from "../../services/APIService";

export const GoogleAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const code = router.query.code;
    if (code) {
      mainApi
        .get(`/auth/google/?code=${code}`)
        .then((response) => {
          // $setUser(response.data);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  const handleGoogelAuth = () => {
    mainApi.get("/auth/google/link/").then((response) => {
      const googleAuthLink = response.data.link;
      window.location.href = googleAuthLink;
    });
  };

  return (
    <Button
      onClick={() => handleGoogelAuth()}
      style={{
        width: 40,
        height: 40,
        marginRight: 10,
        minWidth: 25,
        padding: 5,
      }}
    >
      <GoogleIcon />
    </Button>
  );
};
