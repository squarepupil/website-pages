Contact Form
---

To schedule an interview, for more information, or for general inquiries you can fill out the following contact form; we will respond within one business day.

   <form method="post" action="http://www.aisudbury.org/mail.php">
                  <p><span>Name:</span><input name="name" type="text"></input> </p>
                  <p><span>Email:</span><input name="email" type="text"></input> </p>
                  <p><span>Phone:</span><input name="phone" type="text"></input> </p>
                  <p><p>Comments:</p><textarea name="content" type="text"></textarea> </p>
                  <p><button name="submit" style="width:100px; height: 1.5em;" type="submit" />Submit</button></p>
              </form>


Or you can contact us by email:

office@aisudbury.org

Or call us between 8am and 6pm, Monday through Friday:

(410)426-0001

Or by postal mail at

4915 Holder Avenue, Baltimore, MD 21214

<img id="mapimg" src="img/map.png" />

<iframe class="hide" id="mapframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.5483141137074!2d-76.56180998090352!3d39.3438180506702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c805e8175d1bfb%3A0xb5758c21f5f5c2eb!2s4915+Holder+Ave%2C+Baltimore%2C+MD+21214!5e0!3m2!1sen!2sus!4v1459166789745" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

We have a public [Facebook
page](https://www.facebook.com/Arts-Ideas-Sudbury-School-372859716072)  as
well as a [blog](http://blog.aisudbury.com). Both give an ongoing, inside look
at the school.

---
form > p > span {
    width: 60px;
    display: inline-block;
}

.hide {
    display:none;
}

---

    var mapframe = document.querySelector("#mapframe");
    var map = document.querySelector("#mapimg");
    var replace = function () {
        map.classList.add("hide");
        mapframe.classList.remove("hide");
    }
    map.addEventListener("click", replace);


