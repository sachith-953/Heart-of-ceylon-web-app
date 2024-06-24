import Accordion from "@/components/Accordion/Accordion";
import AccordionItem from "@/components/Accordion/AccordionItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function ProductProfile(){
    return (
        <>
            <Navbar/>
            <MaxWidthWrapper>
                <main>
                    <section>
                        <Accordion>
                            <AccordionItem title="About this item">
                                <article>
                                    <p>
                                        About this item description
                                    </p>
                                </article>
                            </AccordionItem>
                            <AccordionItem title="Reviews">
                                <article>
                                    <p>
                                        Review on product
                                    </p>
                                </article>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </main>
            </MaxWidthWrapper>
        </>
    );
}