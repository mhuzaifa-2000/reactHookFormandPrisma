import { Controller, useForm } from "react-hook-form";
import { Input, Button } from "@mui/material";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/user/", data)
      .then((response) => console.log("User Saved"))
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              className={styles.textbox}
              {...register("email", {
                required: true,
                valueAsEmail: true,
                minLength: 5,
              })}
              placeholder="Email"
              {...field}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              className={styles.textbox}
              {...register("name", {
                required: true,
                minLength: 5,
              })}
              placeholder="Username"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="password"
              className={styles.textbox}
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              placeholder="Password"
              {...field}
            />
          )}
        />
        <Button variant="contained" type="submit" className={styles.submit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
