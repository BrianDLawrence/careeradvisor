<template>
  <div class="container-fluid mx-auto">
    <div class="navbar bg-primary text-primary-content">
      <div class="flex-1 xl:px-20 2xl:px-30">
        <Logo2></Logo2>
      </div>
      <div class="flex-none hidden lg:flex">
        <ul class="menu menu-horizontal lg:px-1 xl:px-20 2xl:px-30">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li @click="handleClick()">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto">
      <NuxtPage />
    </div>
    <AConsentModal></AConsentModal>
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col">
        <p>Copyright © 2023 Spero Autem LLC - All right reserved</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        <a href="https://twitter.com/ArturoCatetry"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" aria-description="Twitter Link for Catetry" class="fill-current">
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
            </path>
          </svg>
        </a>
        <a href="https://www.instagram.com/arturo_catetry/"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
            fill="currentColor" viewBox="0 0 24 24" aria-description="Instragram Link for Catetry">
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>
  
<script setup lang="ts">
const consentAnalyticsCookies = useCookie<{ consent: boolean }>(
  "consentanalytics"
);

onNuxtReady(async () => {
  if (
    consentAnalyticsCookies.value &&
    consentAnalyticsCookies.value.consent == true
  ) {
    console.log("Consent Cookie detected");
    //useGtagConsent(true);
  } else {
    console.log("NO CONSENT COOKIES");
    let consent_state = <HTMLInputElement>(
      document.getElementById("consent_modal")
    );
    //consent_state.checked = true;
    //Currently disabled due to dev -> TODO: install GTAG and enable this when 
    //going PROD!
  }
});

const handleClick = () => {
  const elem = <HTMLElement>document.activeElement;
  if (elem) {
    elem?.blur();
  }
};
</script>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>