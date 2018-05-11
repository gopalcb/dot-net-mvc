using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using React_MVC.Models;

namespace React_MVC.Controllers {
	public class HomeController : Controller {
		private static IList<Element> _element;
		public HomeController() {
			_element = (List<Element>)System.Web.HttpContext.Current.Session["Elements"];
			if(_element == null || _element.Count == 0) {
				_element = new List<Element>
				{
					new Element
					{
						Id = 1,
						Writer = "Daniel Lo Nigro",
						Text = "Div"
					},
					new Element
					{
						Id = 2,
						Writer = "Pete Hunt",
						Text = "Span"
					},
					new Element
					{
						Id = 3,
						Writer = "Jordan Walke",
						Text = "Header"
					}
				};
				System.Web.HttpContext.Current.Session["Elements"] = _element;
			}
		}

		public ActionResult GetElements() {
			var elms = (List<Element>)System.Web.HttpContext.Current.Session["Elements"];
			return Json(elms, JsonRequestBehavior.AllowGet);
		}

		public ActionResult AddElements(Element element) {
			_element.Add(element);
			System.Web.HttpContext.Current.Session["Elements"] = _element;
			return Json(true);
		}

		public ActionResult DeleteElements(int id) {
			var elms = (List<Element>)System.Web.HttpContext.Current.Session["Elements"];
			var elm = elms.FirstOrDefault(e => e.Id == id);
			elms.Remove(elm);
			System.Web.HttpContext.Current.Session["Elements"] = elms;
			return Json(true);
		}

		public ActionResult Index() {
			return View();
		}

		public ActionResult About() {
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact() {
			ViewBag.Message = "Your contact page.";

			return View();
		}
	}
}