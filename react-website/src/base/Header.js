import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header>
                <div id="wb-bnr" className="container">
                <div className="row">
                    <section id="wb-lng" className="col-xs-3 col-sm-12 pull-right text-right">
                    <h2 className="wb-inv">Language selection</h2>
                    <ul className="list-inline mrgn-bttm-0">
                        <li>
                        <a lang="fr" hrefLang="fr" href="/">
                            <span className="hidden-xs">Français</span>
                            <abbr title="Français" className="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">fr</abbr>
                        </a>
                        </li>
                    </ul>
                    </section>
                    <div className="brand col-xs-9 col-sm-5 col-md-4" property="publisher" resource="#wb-publisher" typeof="GovernmentOrganization">
                    <a href="https://www.canada.ca/en.html" property="url">
                        <img src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/sig-blk-en.svg" alt="" property="logo"/><span className="wb-inv" property="name"> Government of Canada / <span lang="fr">Gouvernement du Canada</span></span>
                    </a>
                    <meta property="areaServed" typeof="Country" content="Canada"/>
                    <link property="logo" href="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/wmms-blk.svg"/>
                    </div>
                    <section id="wb-srch" className="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-12 col-sm-5 col-md-4">
                    <h2>Search</h2>
                    <form action="https://www.canada.ca/en/sr/srb.html" method="get" name="cse-search-box" role="search">
                        <div className="form-group wb-srch-qry">
                        <label htmlFor="wb-srch-q" className="wb-inv">Search Canada.ca</label>
                        <input id="wb-srch-q" list="wb-srch-q-ac" className="wb-srch-q form-control" name="q" type="search" defaultValue="" size="34" maxLength="170" placeholder="Search Canada.ca"/>
                        <datalist id="wb-srch-q-ac">
                        </datalist>
                        </div>
                        <div className="form-group submit">
                        <button type="submit" id="wb-srch-sub" className="btn btn-primary btn-small" name="wb-srch-sub"><span className="glyphicon-search glyphicon"></span><span className="wb-inv">Search</span></button>
                        </div>
                    </form>
                    </section>
                </div>
                </div>
                <nav className="gcweb-menu" typeof="SiteNavigationElement">
                <div className="container">
                    <h2 className="wb-inv">Menu</h2>
                    <button type="button" aria-haspopup="true" aria-expanded="false"><span className="wb-inv">Main </span>Menu <span className="expicon glyphicon glyphicon-chevron-down"></span></button>
                    <ul role="menu" aria-orientation="vertical">
                        <li role="presentation"><Link to="/" role="menuitem">Home</Link></li>
                        <li role="presentation"><Link to="/form" role="menuitem">Submit a form</Link></li>
                        <li role="presentation"><a role="menuitem" href="http://localhost:3000/data">View submissions table</a></li>
                        <li role="presentation"><a role="menuitem" href="/admin-sign-in">Admin sign in</a></li>
                    </ul>
                    <a href="/admin-sign-in" className="btn btn-primary btn btn-primary col-lg-offset-9 col-md-offset-8 col-sm-offset-6 col-xs-offset-4">Admin sign in</a>
                </div>
                </nav>
                <nav id="wb-bc" property="breadcrumb">
                <h2>You are here:</h2>
                <div className="container">
                    <ol className="breadcrumb">
                    <li><a href="https://www.canada.ca/en.html">Canada.ca</a></li>
                    </ol>
                </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;