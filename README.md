# reqeuirements 

add `.env` file to root directory 
```
###### set this to you local ip address ######
NEXT_PUBLIC_URL=http://145.223.83.153:3000/
# NEXT_PUBLIC_URL=http://localhost:3000

######### Spring Boot Backend Base-URL #####
NEXT_PUBLIC_SPRING_BOOT_SERVER_URL= http://localhost:8080

PRODUCTS_PER_PRODUCT_SEARCH_RESULT=4
```

---

Stripe payment gatway test cards : https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements#web-test-the-integration


---

# Deploy issues

bug fix artcles : useEffect
https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook


there was issue with the useSearchParams()
to fix that, we can refer to this : https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout


# Heart Of Ceylon FrontEnd

To Start, 

step 1 : open a new terminal. look at vs code tabs upper left corner. 

step 2 : change directory to the project using cd command
cd web-app

step 3 : run this command. this will recover all missing dependencies 
npm install

step 4 : run this command to run server
npm run dev

step 5 : goto localhost:3000

# how to access throught the local network

comment the line NEXT_PUBLIC_URL=http://localhost:3000 and uncomment the commented line in .env file. thats it.


# usefull Tailwind styles

- can use to findout the current screen size
className="bg-red-500 sm:bg-yellow-500 md:bg-blue-700 lg:bg-fuchsia-600 xl:bg-stone-600"


# Installed UI libraries 

#### 1. shadcn
website : https://ui.shadcn.com/
installation instructions
https://ui.shadcn.com/docs/installation/next

commands intial installation
npx shadcn-ui@latest init

drop down :
npx shadcn-ui@latest add dropdown-menu

pagination: pages
npx shadcn-ui@latest add pagination



#### 2. lucide icon library 

https://lucide.dev/guide/installation

commands intial installation
npm install lucide-react


# Other installation 

npm install axios
npm install @tanstack/react-query

# When creating the login sign up pages
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input



# Security Improvements

in next.config.mjs, specify image fetching URL hostname


