<template>
  <form class="form-connexion">
    <h1 style="text-align: center; margin-bottom: 4rem">
      Bienvenue sur Groupama.
    </h1>

    <div class="col-lg-6 col-md-8 col-sm-12 m-auto">
      <div class="mb-3">
        <label for="firstName">Prenom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          class="form-control"
          v-model="user.firstName"
          placeholder="Ex: Dupon"
          required
          @keyup="resetErrors"
        />
        <p class="error-message">{{ errors.firstName }}</p>
      </div>
      <div class="mb-3">
        <label for="lastName">Nom</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          class="form-control"
          v-model="user.lastName"
          placeholder="Ex: Alexandre"
          required
          @keyup="resetErrors"
        />
        <p class="error-message">{{ errors.lastName }}</p>
      </div>
      <div class="mb-3">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="Ex: alexandre.dupon@gmail.com"
          required
          @keyup="resetErrors"
        />
        <p class="error-message">{{ errors.email }}</p>
      </div>
      <div class="mb-3">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="[A-Za-z0-9]+"
          minlength="8"
          class="form-control"
          v-model="user.password"
          placeholder=""
          required
          @keyup="resetErrors"
        />
        <p class="error-message">{{ errors.password }}</p>
      </div>
      <p class="error-message error-message-gen">{{ message }}</p>

      <button
        class="d-flex justify-content-center m-auto col-lg-3 col-md-4 col-sm-12 btn cta-primary"
        @click="createUser"
      >
        Connexion
      </button>
    </div>
  </form>
</template>

<script>
import AuthentificationDataService from "../services/AuthentificationDataService";
import validator from "validator";

export default {
  name: "Register",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      message: "",
      submitted: true,
    };
  },
  methods: {
    validateUserData() {
      const onlyNumbersAndLetters = /^[A-Za-z0-9]+$/;
      const errors = {};
      if (this.user.email.length === 0 || !validator.isEmail(this.user.email)) {
        errors.email = "Veuillez renseigner un email";
      }

      if (this.user.password.length === 0) {
        errors.password = "Veuillez renseigner un mot de passe";
      }
      if (
        this.user.password.length > 0 &&
        !onlyNumbersAndLetters.test(this.user.password)
      ) {
        errors.password =
          "Le mdp doit contenir uniquement des lettres et chiffres";
      }
      if (this.user.firstName.length === 0) {
        errors.firstName = "Veuillez renseigner votre prenom";
      }
      if (this.user.lastName.length === 0) {
        errors.lastName = "Veuillez renseigner votre nom";
      }

      return errors;
    },
    createUser(event) {
      event.preventDefault();

      const errors = this.validateUserData();
      if (Object.keys(errors).length) {
        this.errors = errors;
        return;
      }

      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      };

      AuthentificationDataService.createUser(data)
        .then(() => {
          console.log("succes");
          this.$router.push("/login");
          this.message = "Utilisateur enregistré";
        })
        .catch(() => {
          this.message = "L'utilisateur avec ce email existe déjà";
        });
    },
    resetErrors(e) {
      this.errors[e.target.name] = "";
    },
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

.error-message {
  font-size: 0.8rem;
  font-weight: bold;
  color: red;
}

.error-message-gen {
  text-align: center !important;
}
</style>
