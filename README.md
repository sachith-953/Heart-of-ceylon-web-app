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




# add this to database top selling product detail
 Made a array for contain all text info and image paths

 INSERT INTO top_selling_products
 (productid, product_name,product_main_image, product_price )
VALUES
(1,'Leaf Tea Packs Qualitea Ceylon (Pvt) Ltd','https://ceylonroyaltea.com/wp-content/uploads/2019/08/400G-Loose-Leaf-Tea-Pack.png' ,36.76),
(2,'Nescafe Clasico, 7 Count Box, Instant Dark Roast Sri Lanka Ubuy','https://images-cdn.ubuy.co.in/63426f24bb13964ab718b206-nescafe-clasico-dark-roast-instant.jpg' ,36.76),
(3,'Ceylon Cinnamon Powder - 100g - Tree of Life','https://treeoflifelk.com/wp-content/uploads/2021/10/Cinnamon-Powder.png'  ,36.76),
(4,'Natural Ceylon Blue Sapphire Online from Sri Lanka','https://ceylongemhub.com/images/product/CGH900/5761df07-3cd1-413c-b1b7-8923f9da3202.jpg' ,36.76),
(5,'Coconuts with the husk', 'https://images-cdn.ubuy.co.in/652a3630922d6e39854ba47e-savia-coconut-milk-13-5-fl-oz.jpg' ,36.76),
(6,'JOBBS MENS CASUAL POLO T-SHIRT Fashion Bug Online Clothing Stores','https://images-cdn.ubuy.co.in/665611759187500bb60f08c8-ubud-t-shirt-t-shirt.jpg' ,36.76),
(7,'Male Crowntail Betta Freshwaterfish Aquariumfish Coburg Aquairum','https://images-cdn.ubuy.co.in/663bc0d0196c92688c1b6c52-medaka-youkihi-ricefish-packs-of-6.jpg' ,36.76)
;

   {
     name: 'Leaf Tea Packs Qualitea Ceylon (Pvt) Ltd',
     img: 'assets/images/img_1.jpg',
     price: '$36.09'
   },
   {
     name: 'Nescafe Clasico, 7 Count Box, Instant Dark Roast Sri Lanka Ubuy',
     img: 'assets/images/img_2.jpg',
     price: '$36.76'
   },
   {
     name: 'Ceylon Cinnamon Powder - 100g - Tree of Life',
     img: 'assets/images/img_3.jpg',
     price: '$36.98'
   },
   {
     name: 'Natural Ceylon Blue Sapphire Online from Sri Lanka',
     img: 'assets/images/img_4.jpg',
     price: '$36.76'
   },
   {
     name: 'Coconuts with the husk',
     img: 'assets/images/img_5.jpg',
     price: '$36.76'
   },
   {
     name: 'JOBBS MENS CASUAL POLO T-SHIRT Fashion Bug Online Clothing Stores',
     img: 'assets/images/img_6.jpg',
     price: '$36.76'
   },
   {
     name: 'Male Crowntail Betta Freshwaterfish Aquariumfish Coburg Aquairum',
     img: 'assets/images/img_7.jpg',
     price: '$36.76'
   }
 ]