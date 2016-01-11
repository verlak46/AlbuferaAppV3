



<!DOCTYPE html>
<html lang="en" class=" is-copy-enabled is-u2f-enabled">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta name="viewport" content="width=1020">
    <meta content="origin" name="referrer" />
    
    <title>ionic Before Prepare Hooks</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://gist.github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="ionic Before Prepare Hooks" name="twitter:title" /><meta content="ionic Before Prepare Hooks" name="twitter:description" /><meta content="https://avatars3.githubusercontent.com/u/597833?v=3&amp;s=400" name="twitter:image:src" />
      <meta content="Gist" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars3.githubusercontent.com/u/597833?v=3&amp;s=400" property="og:image" /><meta content="ionic Before Prepare Hooks" property="og:title" /><meta content="https://gist.github.com/agustinhaller/5e489e5419e43b11d7b7" property="og:url" /><meta content="ionic Before Prepare Hooks" property="og:description" />
      <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">
    <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="web-socket" href="wss://live.github.com/_sockets/MTMwMzYxMzU6MDpiMTZlOWQyMmNlY2YzMDhlYjc1YTI3NmMzZDgyYTY4N2U3OGQyZThiMjk0OWExYTEyMjFiZjQ5YjQzNTkyMDBj--85721fe7dc517197a6c2788bf1383c679c5eff0a">
    <meta name="pjax-timeout" content="1000">
    <link rel="sudo-modal" href="/sessions/sudo_modal">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="gist_code" data-pjax-transient>

    <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
    <meta name="google-analytics" content="UA-3769691-4">

<meta content="collector.githubapp.com" name="octolytics-host" /><meta content="gist" name="octolytics-app-id" /><meta content="51CA51AE:62BD:7AE6206:56938124" name="octolytics-dimension-request_id" /><meta content="13036135" name="octolytics-actor-id" /><meta content="verlak46" name="octolytics-actor-login" /><meta content="6e0f2964e2d5a417a40efd90315df67e78674ab6c012cd250c602981d5e38ba0" name="octolytics-actor-hash" />
<meta content="/&lt;user-name&gt;/&lt;gist-id&gt;" data-pjax-transient="true" name="analytics-location" />
<meta content="Rails, view, gists/gists#show" data-pjax-transient="true" name="analytics-event" />


  <meta class="js-ga-set" name="dimension1" content="Logged In">


    <meta content="false" name="octolytics-dimension-public" /><meta content="19593055" name="octolytics-dimension-gist_id" /><meta content="5e489e5419e43b11d7b7" name="octolytics-dimension-gist_name" /><meta content="false" name="octolytics-dimension-anonymous" /><meta content="597833" name="octolytics-dimension-owner_id" /><meta content="agustinhaller" name="octolytics-dimension-owner_login" /><meta content="false" name="octolytics-dimension-forked" />

  <meta class="js-ga-set" name="dimension5" content="secret">
  <meta class="js-ga-set" name="dimension6" content="owned">
  <meta class="js-ga-set" name="dimension7" content="javascript">



        <meta name="hostname" content="gist.github.com">
    <meta name="user-login" content="verlak46">

        <meta name="expected-hostname" content="gist.github.com">

      <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#4078c0">
      <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">

    <meta content="59d47b1d139791da77d2001e176eed7f53016522" name="form-nonce" />

    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github-2cd8e7b7c650541e94a142c9c10fb231b81455e1777c62510eb9b3402cc220b3.css" integrity="sha256-LNjnt8ZQVB6UoULJwQ+yMbgUVeF3fGJRDrmzQCzCILM=" media="all" rel="stylesheet" />
    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github2-ceee0e6040d1030b365b8e3d7b8253580a1b367dd5a04caac69de46b320ad095.css" integrity="sha256-zu4OYEDRAws2W449e4JTWAobNn3VoEyqxp3kazIK0JU=" media="all" rel="stylesheet" />
    
    


    <meta http-equiv="x-pjax-version" content="3fa31291a3392c21fe713562c40f1dcc">

        <link href="/agustinhaller.atom" rel="alternate" title="atom" type="application/atom+xml">
  <meta content="noindex, follow" name="robots" />
  <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/gist-bc01da0462f1073c52430d4b1f518967c71c4e9d0bcbf5d492e31ee6ec684c05.css" integrity="sha256-vAHaBGLxBzxSQw1LH1GJZ8ccTp0Ly/XUkuMe5uxoTAU=" media="all" rel="stylesheet" />

  </head>


  <body class="logged_in   env-production windows">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>

    
    
    



        <div class="header gist-header header-logged-in" role="banner">
  <div class="container clearfix">

    <a href="/" aria-label="Gist Homepage" class="header-logo-wordmark" data-hotkey="g d">
      <span aria-hidden="true" class="mega-octicon octicon-logo-github"></span>
      <span aria-hidden="true" class="mega-octicon octicon-logo-gist"></span>
</a>
    <div class="site-search js-site-search" role="search">
        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <label class="js-chromeless-input-container form-control">
    <input type="text"
      class="js-site-search-focus chromeless-input js-navigation-enable js-quicksearch-field"
      data-hotkey="s"
      name="q"
      placeholder="Search…"
      tabindex="1"
      autocorrect="off"
      autocomplete="off"
      autocapitalize="off">
  </label>

    <div class="gist-quicksearch-results js-quicksearch-results js-navigation-container" data-quicksearch-url="/search/quick"></div>
</form>
    </div>
    <ul class="header-nav left" role="navigation">
      <li class="header-nav-item">
        <a href="/discover" class="header-nav-link" data-ga-click="Header, go to all gists, text:all gists">All gists</a>
      </li>

      <li class="header-nav-item">
        <a href="https://github.com" class="header-nav-link" data-ga-click="Header, go to GitHub, text:GitHub">GitHub</a>
      </li>
    </ul>

      <ul class="header-nav user-nav right" id="user-links">
        <li class="header-nav-item">
          <a href="/" class="btn btn-sm" data-ga-click="Header, go to new gist, text:new gist">New gist</a>
        </li>

        <li class="header-nav-item dropdown js-menu-container">
          <a class="header-nav-link name tooltipped tooltipped-sw js-menu-target" href="#"
            aria-label="View profile and more"
            data-ga-click="Header, show menu, icon:avatar">
            <img alt="@verlak46" class="avatar" height="20" src="https://avatars3.githubusercontent.com/u/13036135?v=3&amp;s=40" width="20" />
            <span class="dropdown-caret"></span>
          </a>

          <div class="dropdown-menu-content js-menu-content">
            <div class="dropdown-menu dropdown-menu-sw">
              <div class="dropdown-header header-nav-current-user css-truncate">
                Signed in as <strong class="css-truncate-target">verlak46</strong>
              </div>
              <div class="dropdown-divider"></div>

              <a class="dropdown-item" href="/verlak46" data-ga-click="Header, go to your gists, text:your gists">
                Your gists
              </a>

              <a class="dropdown-item" href="/verlak46/starred" data-ga-click="Header, go to starred gists, text:starred gists">
                Starred gists
              </a>

              <a class="dropdown-item" href="https://help.github.com" data-ga-click="Header, go to help, text:help">
                Help
              </a>

              <div class="dropdown-divider"></div>

              <a class="dropdown-item" href="https://github.com/verlak46" data-ga-click="Header, go to profile, text:your profile">
                Your GitHub profile
              </a>

              <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="https://gist.github.com/auth/github/logout" class="logout-form" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="kBXnLJEEurvDJFWzF3tVSV0EctpvGdM10szLt/rt/Gm2BBwWXQ2hjxwlKsIx4lvJ0Fh4/qF2AwhbLPzmkMzQ9Q==" /></div>
                <button class="dropdown-item dropdown-signout" data-ga-click="Header, sign out, icon:logout">
                  Sign out
                </button>
</form>            </div>
          </div>
        </li>
      </ul>

  </div>
</div>



      


    <div id="start-of-content" class="accessibility-aid"></div>

      <div id="js-flash-container">
</div>


    <div role="main" class="main-content">
      
  <div itemscope itemtype="http://schema.org/WebPage">
    <div id="gist-pjax-container" class="gist-content-wrapper context-loader-container js-repo-nav-next" data-pjax-container>
      

  <div class="gisthead pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
    <div class="container">
        

<div class="container repohead-details-container">

  <ul class="pagehead-actions">


    <li>
        
  <div class="js-toggler-container js-social-container starring-container ">

    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/agustinhaller/5e489e5419e43b11d7b7/unstar" class="js-toggler-form starred js-unstar-button" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="FZs13W9RgVyt/MIRHMDqj079iO0u3+BdHAWvcdRcRw5NRRqDztKVYmMEa+HXaTNd4fefvXpREVKCo9QCyo+xhg==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Unstar this gist" title="Unstar agustinhaller/5e489e5419e43b11d7b7"
        data-ga-click="Repository, click unstar button, action:gists/gists#show; text:Unstar">
        <span aria-hidden="true" class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/agustinhaller/5e489e5419e43b11d7b7/stargazers">
          3
        </a>
</form>
    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/agustinhaller/5e489e5419e43b11d7b7/star" class="js-toggler-form unstarred js-star-button" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="Tc/JhzQaJgN7d5GpC4zZ0FBPAJgVQTFUcr6tFaQKiZ4Ub/59UXcoDjzQ+CG2KKUHFDkzK/fOAZuQakHCsiecUQ==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Star this gist" title="Star agustinhaller/5e489e5419e43b11d7b7"
        data-ga-click="Repository, click star button, action:gists/gists#show; text:Star">
        <span aria-hidden="true" class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/agustinhaller/5e489e5419e43b11d7b7/stargazers">
          3
        </a>
</form>  </div>


    </li>

      <li>
          <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/agustinhaller/5e489e5419e43b11d7b7/fork" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="9IYUTLTkEYVIj6Q6QIsfmpL8mwvSsKe4HXFSx70x8Y6imq2xs+T8Yq4GiFRKQa7lcrKgC6j1yewZzCI2G1DB5w==" /></div>
    <button class="btn btn-sm btn-with-count" type="submit">
      <span aria-hidden="true" class="octicon octicon-repo-forked"></span>
      Fork
    </button>
      <a class="social-count js-social-count" href="/agustinhaller/5e489e5419e43b11d7b7/forks">5</a>
</form>
      </li>

      <li>
        <div class="select-menu js-menu-container js-select-menu gist-user-actions">
          <button class="btn btn-sm select-menu-button icon-only js-menu-target" type="button" aria-haspopup="true" aria-label="Report user">
            <span aria-hidden="true" class="octicon octicon-stop"></span>
          </button>

          <div class="select-menu-modal-holder js-menu-content js-navigation-container">
            <div class="select-menu-modal">
              <div class="select-menu-header">
                <span aria-label="Close" class="octicon octicon-x js-menu-close" role="button"></span>
                <span class="select-menu-title">User actions</span>
              </div>
              <div class="select-menu-list">
                <div class="select-menu-item js-navigation-item">
                  <!-- </textarea> --><!-- '"` --><form action="/agustinhaller/5e489e5419e43b11d7b7/report" class="inline-form" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" method="post"><div><input class="btn-plain select-menu-item-text js-navigation-open" type="submit" value="Report abuse" /><input name="authenticity_token" type="hidden" value="zmcMeLE85OSOJYMFwqFstYVP2BPp2yJhpyeFgBIk8PLmqgI4UggNcJ6dVLPy+gwOsKcAGZNKA4XxbpOMNG7kbg==" /></div></form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
  </ul>

  <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title secret css-truncate">
    <img alt="@agustinhaller" class="avatar gist-avatar" height="26" src="https://avatars2.githubusercontent.com/u/597833?v=3&amp;s=52" width="26" />
    <span class="author"><a href="/agustinhaller" class="url fn" itemprop="url" rel="author"><span itemprop="title">agustinhaller</span></a></span><!--
        --><span class="path-divider">/</span><!--
        --><strong class="gist-header-title css-truncate-target"><a href="/agustinhaller/5e489e5419e43b11d7b7">01_jshint.js</a></strong>
      <span class="gist-secret-label">secret</span>

    <span class="page-context-loader">
      <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
    </span>

    <div class="gist-timestamp">Last active <time datetime="2015-10-22T08:45:46Z" is="time-ago">Oct 22, 2015</time></div>
  </h1>
</div>

<div class="container gist-file-navigation">
  <div class="right file-navigation-options" data-multiple>

    <div class="file-navigation-option">
  <input type="hidden" name="protocol_type" value="clone">

  <div class="select-menu js-menu-container js-select-menu">
    <div class="input-group js-select-button js-zeroclipboard-container">
      <div class="input-group-button">
  <button type="button" class="btn btn-sm select-menu-button js-menu-target" data-ga-click="Repository, clone Embed, location:repo overview">
    Embed
  </button>
</div>
<input type="text" class="input-monospace input-mini js-zeroclipboard-target js-url-field" value="&lt;script src=&quot;https://gist.github.com/agustinhaller/5e489e5419e43b11d7b7.js&quot;&gt;&lt;/script&gt;" readonly>
<div class="input-group-button">
  <button aria-label="Copy to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button"><span aria-hidden="true" class="octicon octicon-clippy"></span></button>
</div>

    </div>

    <div class="select-menu-modal-holder">
      <div class="select-menu-modal js-menu-content" aria-hidden="true">
        <div class="select-menu-header">
          <span aria-label="Close" class="octicon octicon-x js-menu-close" role="button"></span>
          <span class="select-menu-title">What would you like to do?</span>
        </div>

        <div class="select-menu-list js-navigation-container" role="menu">
            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <div class="select-menu-item-text">
                <input type="radio" name="protocol_selector" value="embed" checked>
                <span class="select-menu-item-heading">
                  
                  Embed
                </span>
                  <span class="description">
                    Embed this gist in your website.
                  </span>
                <span class="js-select-button-text hidden-select-button-text">
                  <div class="input-group-button">
  <button type="button" class="btn btn-sm select-menu-button js-menu-target" data-ga-click="Repository, clone Embed, location:repo overview">
    Embed
  </button>
</div>
<input type="text" class="input-monospace input-mini js-zeroclipboard-target js-url-field" value="&lt;script src=&quot;https://gist.github.com/agustinhaller/5e489e5419e43b11d7b7.js&quot;&gt;&lt;/script&gt;" readonly>
<div class="input-group-button">
  <button aria-label="Copy to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button"><span aria-hidden="true" class="octicon octicon-clippy"></span></button>
</div>

                </span>
              </div>
            </div>
            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <div class="select-menu-item-text">
                <input type="radio" name="protocol_selector" value="share" >
                <span class="select-menu-item-heading">
                  
                  Share
                </span>
                  <span class="description">
                    Copy sharable URL for this gist.
                  </span>
                <span class="js-select-button-text hidden-select-button-text">
                  <div class="input-group-button">
  <button type="button" class="btn btn-sm select-menu-button js-menu-target" data-ga-click="Repository, clone Share, location:repo overview">
    Share
  </button>
</div>
<input type="text" class="input-monospace input-mini js-zeroclipboard-target js-url-field" value="https://gist.github.com/agustinhaller/5e489e5419e43b11d7b7" readonly>
<div class="input-group-button">
  <button aria-label="Copy to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button"><span aria-hidden="true" class="octicon octicon-clippy"></span></button>
</div>

                </span>
              </div>
            </div>
            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <div class="select-menu-item-text">
                <input type="radio" name="protocol_selector" value="http" >
                <span class="select-menu-item-heading">
                  Clone via
                  HTTPS
                </span>
                  <span class="description">
                    Clone with Git or checkout with SVN using the repository's web address.
                  </span>
                <span class="js-select-button-text hidden-select-button-text">
                  <div class="input-group-button">
  <button type="button" class="btn btn-sm select-menu-button js-menu-target" data-ga-click="Repository, clone HTTPS, location:repo overview">
    HTTPS
  </button>
</div>
<input type="text" class="input-monospace input-mini js-zeroclipboard-target js-url-field" value="https://gist.github.com/5e489e5419e43b11d7b7.git" readonly>
<div class="input-group-button">
  <button aria-label="Copy to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button"><span aria-hidden="true" class="octicon octicon-clippy"></span></button>
</div>

                </span>
              </div>
            </div>
            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <div class="select-menu-item-text">
                <input type="radio" name="protocol_selector" value="ssh" >
                <span class="select-menu-item-heading">
                  Clone via
                  SSH
                </span>
                  <span class="description">
                    Clone with an SSH key and passphrase from your GitHub settings.
                  </span>
                <span class="js-select-button-text hidden-select-button-text">
                  <div class="input-group-button">
  <button type="button" class="btn btn-sm select-menu-button js-menu-target" data-ga-click="Repository, clone SSH, location:repo overview">
    SSH
  </button>
</div>
<input type="text" class="input-monospace input-mini js-zeroclipboard-target js-url-field" value="git@gist.github.com:5e489e5419e43b11d7b7.git" readonly>
<div class="input-group-button">
  <button aria-label="Copy to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button"><span aria-hidden="true" class="octicon octicon-clippy"></span></button>
</div>

                </span>
              </div>
            </div>
        </div>
        <div class="select-menu-list" role="menu">
          <a class="select-menu-item select-menu-action" href="https://help.github.com/articles/which-remote-url-should-i-use" target="_blank">
            <span aria-hidden="true" class="octicon octicon-question select-menu-item-icon"></span>
            <div class="select-menu-item-text">
              Learn more about clone URLs
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>


    <div class="file-navigation-option">
    <div class="select-menu js-menu-container select-menu-modal-right js-select-menu">
      <button type="button" class="btn btn-sm select-menu-button icon-only js-menu-target">
        <span aria-hidden="true" class="octicon octicon-desktop-download"></span>
      </button>
      <div class="select-menu-modal-holder">
        <div class="select-menu-modal select-menu-modal-narrow js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span aria-label="Close" class="octicon octicon-x js-menu-close" role="button"></span>
            <span class="select-menu-title">Open repository with…</span>
          </div>
          <div class="select-menu-list js-navigation-container" role="menu">
            <a class="select-menu-item js-navigation-item" href="github-windows://openRepo/https://gist.github.com/5e489e5419e43b11d7b7" role="menuitem" tabindex="0">
              <span class="select-menu-item-text">
                GitHub Desktop
              </span>
            </a>
            <a class="select-menu-item js-navigation-item" href="git-client://clone?repo=https%3A%2F%2Fgist.github.com%2Fagustinhaller%2F5e489e5419e43b11d7b7" role="menuitem" tabindex="0">
              <span class="select-menu-item-text">
                Visual Studio
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
</div>


    <div class="file-navigation-option">
      <a href="/agustinhaller/5e489e5419e43b11d7b7/archive/732395a75a1b51948ebdf4118a68f8c9865df624.zip"
          class="btn btn-sm"
          rel="nofollow"
          data-ga-click="Gist, download zip, location:gist overview">
        Download ZIP
      </a>
    </div>
  </div>

  <div class="left">
    <nav class="reponav js-repo-nav js-sidenav-container-pjax js-octicon-loaders"
     role="navigation"
     data-pjax="#gist-pjax-container">

  <a href="/agustinhaller/5e489e5419e43b11d7b7" aria-label="Code" aria-selected="true" class="js-selected-navigation-item selected reponav-item" data-hotkey="g c" data-pjax="true" data-selected-links="gist_code /agustinhaller/5e489e5419e43b11d7b7">
    <span aria-hidden="true" class="octicon octicon-code"></span>
    Code
</a>
    <a href="/agustinhaller/5e489e5419e43b11d7b7/revisions" aria-label="Revisions" class="js-selected-navigation-item reponav-item" data-hotkey="g r" data-pjax="true" data-selected-links="gist_revisions /agustinhaller/5e489e5419e43b11d7b7/revisions">
      <span aria-hidden="true" class="octicon octicon-git-commit"></span>
      Revisions
      <span class="counter">3</span>
</a>
    <a href="/agustinhaller/5e489e5419e43b11d7b7/stargazers" aria-label="Stars" class="js-selected-navigation-item reponav-item" data-hotkey="g s" data-pjax="true" data-selected-links="gist_stars /agustinhaller/5e489e5419e43b11d7b7/stargazers">
      <span aria-hidden="true" class="octicon octicon-star"></span>
      Stars
      <span class="counter">3</span>
</a>
    <a href="/agustinhaller/5e489e5419e43b11d7b7/forks" aria-label="Forks" class="js-selected-navigation-item reponav-item" data-hotkey="g f" data-pjax="true" data-selected-links="gist_forks /agustinhaller/5e489e5419e43b11d7b7/forks">
      <span aria-hidden="true" class="octicon octicon-git-branch"></span>
      Forks
      <span class="counter">5</span>
</a></nav>

  </div>
</div>


    </div><!-- /.container -->
  </div><!-- /.repohead -->

<div class="container new-discussion-timeline experiment-repo-nav">
  <div class="repository-content gist-content context-loader-container">
    



<div>
  <div class="repository-meta js-details-container">
  <div class="repository-meta-content">
    ionic Before Prepare Hooks
  </div>
</div>


      <div class="js-gist-file-update-container js-task-list-container file-box">
  <div id="file-01_jshint-js" class="file">
      <div class="file-header">
        <div class="file-actions">

          <a href="/agustinhaller/5e489e5419e43b11d7b7/raw/732395a75a1b51948ebdf4118a68f8c9865df624/01_jshint.js" class="btn btn-sm ">Raw</a>
        </div>
        <div class="file-info">
          <span class="icon">
            <span aria-hidden="true" class="octicon octicon-gist"></span>
          </span>
          <a class="tooltipped tooltipped-s css-truncate" aria-label="Permalink" href="#file-01_jshint-js">
            <strong class="user-select-contain gist-blob-name css-truncate-target">
              01_jshint.js
            </strong>
          </a>
        </div>
      </div>
    

  <div class="blob-wrapper data type-javascript">
      <table class="highlight tab-size js-file-line-container" data-tab-size="8">
      <tr>
        <td id="file-01_jshint-js-L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="file-01_jshint-js-LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-c">#!/usr/bin/env node</span></td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="file-01_jshint-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="file-01_jshint-js-LC3" class="blob-code blob-code-inner js-file-line"><span class="pl-k">var</span> fs <span class="pl-k">=</span> <span class="pl-c1">require</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>fs<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="file-01_jshint-js-LC4" class="blob-code blob-code-inner js-file-line"><span class="pl-k">var</span> path <span class="pl-k">=</span> <span class="pl-c1">require</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>path<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="file-01_jshint-js-LC5" class="blob-code blob-code-inner js-file-line"><span class="pl-k">var</span> jshint <span class="pl-k">=</span> <span class="pl-c1">require</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>jshint<span class="pl-pds">&#39;</span></span>).<span class="pl-c1">JSHINT</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="file-01_jshint-js-LC6" class="blob-code blob-code-inner js-file-line"><span class="pl-k">var</span> <span class="pl-k">async</span> <span class="pl-k">=</span> <span class="pl-c1">require</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>async<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="file-01_jshint-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="file-01_jshint-js-LC8" class="blob-code blob-code-inner js-file-line"><span class="pl-k">var</span> foldersToProcess <span class="pl-k">=</span> [</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="file-01_jshint-js-LC9" class="blob-code blob-code-inner js-file-line">		<span class="pl-s"><span class="pl-pds">&#39;</span>js<span class="pl-pds">&#39;</span></span></td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="file-01_jshint-js-LC10" class="blob-code blob-code-inner js-file-line">];</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="file-01_jshint-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="file-01_jshint-js-LC12" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">foldersToProcess</span>.<span class="pl-en">forEach</span>(<span class="pl-k">function</span>(<span class="pl-smi">folder</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="file-01_jshint-js-LC13" class="blob-code blob-code-inner js-file-line">		<span class="pl-en">processFiles</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>www/<span class="pl-pds">&quot;</span></span> <span class="pl-k">+</span> folder);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="file-01_jshint-js-LC14" class="blob-code blob-code-inner js-file-line">});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="file-01_jshint-js-LC15" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="file-01_jshint-js-LC16" class="blob-code blob-code-inner js-file-line"><span class="pl-k">function</span> <span class="pl-en">processFiles</span>(<span class="pl-smi">dir</span>, <span class="pl-smi">callback</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="file-01_jshint-js-LC17" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> errorCount <span class="pl-k">=</span> <span class="pl-c1">0</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="file-01_jshint-js-LC18" class="blob-code blob-code-inner js-file-line">		<span class="pl-smi">fs</span>.<span class="pl-en">readdir</span>(dir, <span class="pl-k">function</span>(<span class="pl-smi">err</span>, <span class="pl-smi">list</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="file-01_jshint-js-LC19" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">if</span> (err) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="file-01_jshint-js-LC20" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>processFiles err: <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> err);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="file-01_jshint-js-LC21" class="blob-code blob-code-inner js-file-line">						<span class="pl-k">return</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="file-01_jshint-js-LC22" class="blob-code blob-code-inner js-file-line">				}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L23" class="blob-num js-line-number" data-line-number="23"></td>
        <td id="file-01_jshint-js-LC23" class="blob-code blob-code-inner js-file-line">				<span class="pl-smi">async</span>.<span class="pl-en">eachSeries</span>(list, <span class="pl-k">function</span>(<span class="pl-smi">file</span>, <span class="pl-smi">innercallback</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L24" class="blob-num js-line-number" data-line-number="24"></td>
        <td id="file-01_jshint-js-LC24" class="blob-code blob-code-inner js-file-line">						file <span class="pl-k">=</span> dir <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">&#39;</span>/<span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> file;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L25" class="blob-num js-line-number" data-line-number="25"></td>
        <td id="file-01_jshint-js-LC25" class="blob-code blob-code-inner js-file-line">						<span class="pl-smi">fs</span>.<span class="pl-en">stat</span>(file, <span class="pl-k">function</span>(<span class="pl-smi">err</span>, <span class="pl-smi">stat</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L26" class="blob-num js-line-number" data-line-number="26"></td>
        <td id="file-01_jshint-js-LC26" class="blob-code blob-code-inner js-file-line">								<span class="pl-k">if</span>(<span class="pl-k">!</span><span class="pl-smi">stat</span>.<span class="pl-en">isDirectory</span>()) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L27" class="blob-num js-line-number" data-line-number="27"></td>
        <td id="file-01_jshint-js-LC27" class="blob-code blob-code-inner js-file-line">										<span class="pl-k">if</span>(<span class="pl-smi">path</span>.<span class="pl-en">extname</span>(file) <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">&quot;</span>.js<span class="pl-pds">&quot;</span></span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L28" class="blob-num js-line-number" data-line-number="28"></td>
        <td id="file-01_jshint-js-LC28" class="blob-code blob-code-inner js-file-line">												<span class="pl-en">lintFile</span>(file, <span class="pl-k">function</span>(<span class="pl-smi">hasError</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L29" class="blob-num js-line-number" data-line-number="29"></td>
        <td id="file-01_jshint-js-LC29" class="blob-code blob-code-inner js-file-line">														<span class="pl-k">if</span>(hasError) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L30" class="blob-num js-line-number" data-line-number="30"></td>
        <td id="file-01_jshint-js-LC30" class="blob-code blob-code-inner js-file-line">																errorCount<span class="pl-k">++</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L31" class="blob-num js-line-number" data-line-number="31"></td>
        <td id="file-01_jshint-js-LC31" class="blob-code blob-code-inner js-file-line">														}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L32" class="blob-num js-line-number" data-line-number="32"></td>
        <td id="file-01_jshint-js-LC32" class="blob-code blob-code-inner js-file-line">														<span class="pl-en">innercallback</span>();</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L33" class="blob-num js-line-number" data-line-number="33"></td>
        <td id="file-01_jshint-js-LC33" class="blob-code blob-code-inner js-file-line">												});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L34" class="blob-num js-line-number" data-line-number="34"></td>
        <td id="file-01_jshint-js-LC34" class="blob-code blob-code-inner js-file-line">										} <span class="pl-k">else</span> {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L35" class="blob-num js-line-number" data-line-number="35"></td>
        <td id="file-01_jshint-js-LC35" class="blob-code blob-code-inner js-file-line">												<span class="pl-en">innercallback</span>();</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L36" class="blob-num js-line-number" data-line-number="36"></td>
        <td id="file-01_jshint-js-LC36" class="blob-code blob-code-inner js-file-line">										}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L37" class="blob-num js-line-number" data-line-number="37"></td>
        <td id="file-01_jshint-js-LC37" class="blob-code blob-code-inner js-file-line">								} <span class="pl-k">else</span> {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L38" class="blob-num js-line-number" data-line-number="38"></td>
        <td id="file-01_jshint-js-LC38" class="blob-code blob-code-inner js-file-line">										<span class="pl-en">innercallback</span>();</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L39" class="blob-num js-line-number" data-line-number="39"></td>
        <td id="file-01_jshint-js-LC39" class="blob-code blob-code-inner js-file-line">								}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L40" class="blob-num js-line-number" data-line-number="40"></td>
        <td id="file-01_jshint-js-LC40" class="blob-code blob-code-inner js-file-line">						});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L41" class="blob-num js-line-number" data-line-number="41"></td>
        <td id="file-01_jshint-js-LC41" class="blob-code blob-code-inner js-file-line">				}, <span class="pl-k">function</span>(<span class="pl-smi">error</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L42" class="blob-num js-line-number" data-line-number="42"></td>
        <td id="file-01_jshint-js-LC42" class="blob-code blob-code-inner js-file-line">						<span class="pl-k">if</span>(errorCount <span class="pl-k">&gt;</span> <span class="pl-c1">0</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L43" class="blob-num js-line-number" data-line-number="43"></td>
        <td id="file-01_jshint-js-LC43" class="blob-code blob-code-inner js-file-line">								<span class="pl-smi">process</span>.<span class="pl-en">exit</span>(<span class="pl-c1">1</span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L44" class="blob-num js-line-number" data-line-number="44"></td>
        <td id="file-01_jshint-js-LC44" class="blob-code blob-code-inner js-file-line">						}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L45" class="blob-num js-line-number" data-line-number="45"></td>
        <td id="file-01_jshint-js-LC45" class="blob-code blob-code-inner js-file-line">				});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L46" class="blob-num js-line-number" data-line-number="46"></td>
        <td id="file-01_jshint-js-LC46" class="blob-code blob-code-inner js-file-line">		});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L47" class="blob-num js-line-number" data-line-number="47"></td>
        <td id="file-01_jshint-js-LC47" class="blob-code blob-code-inner js-file-line">}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L48" class="blob-num js-line-number" data-line-number="48"></td>
        <td id="file-01_jshint-js-LC48" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L49" class="blob-num js-line-number" data-line-number="49"></td>
        <td id="file-01_jshint-js-LC49" class="blob-code blob-code-inner js-file-line"><span class="pl-k">function</span> <span class="pl-en">lintFile</span>(<span class="pl-smi">file</span>, <span class="pl-smi">callback</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L50" class="blob-num js-line-number" data-line-number="50"></td>
        <td id="file-01_jshint-js-LC50" class="blob-code blob-code-inner js-file-line">		<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>Linting <span class="pl-pds">&quot;</span></span> <span class="pl-k">+</span> file);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L51" class="blob-num js-line-number" data-line-number="51"></td>
        <td id="file-01_jshint-js-LC51" class="blob-code blob-code-inner js-file-line">		<span class="pl-smi">fs</span>.<span class="pl-en">readFile</span>(file, <span class="pl-k">function</span>(<span class="pl-smi">err</span>, <span class="pl-smi">data</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L52" class="blob-num js-line-number" data-line-number="52"></td>
        <td id="file-01_jshint-js-LC52" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">if</span>(err) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L53" class="blob-num js-line-number" data-line-number="53"></td>
        <td id="file-01_jshint-js-LC53" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>Error: <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> err);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L54" class="blob-num js-line-number" data-line-number="54"></td>
        <td id="file-01_jshint-js-LC54" class="blob-code blob-code-inner js-file-line">						<span class="pl-k">return</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L55" class="blob-num js-line-number" data-line-number="55"></td>
        <td id="file-01_jshint-js-LC55" class="blob-code blob-code-inner js-file-line">				}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L56" class="blob-num js-line-number" data-line-number="56"></td>
        <td id="file-01_jshint-js-LC56" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">if</span>(<span class="pl-en">jshint</span>(<span class="pl-smi">data</span>.<span class="pl-c1">toString</span>())) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L57" class="blob-num js-line-number" data-line-number="57"></td>
        <td id="file-01_jshint-js-LC57" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>File <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> file <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">&#39;</span> has no errors.<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L58" class="blob-num js-line-number" data-line-number="58"></td>
        <td id="file-01_jshint-js-LC58" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>-----------------------------------------<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L59" class="blob-num js-line-number" data-line-number="59"></td>
        <td id="file-01_jshint-js-LC59" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">callback</span>(<span class="pl-c1">false</span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L60" class="blob-num js-line-number" data-line-number="60"></td>
        <td id="file-01_jshint-js-LC60" class="blob-code blob-code-inner js-file-line">				} <span class="pl-k">else</span> {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L61" class="blob-num js-line-number" data-line-number="61"></td>
        <td id="file-01_jshint-js-LC61" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>Errors in file <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> file);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L62" class="blob-num js-line-number" data-line-number="62"></td>
        <td id="file-01_jshint-js-LC62" class="blob-code blob-code-inner js-file-line">						<span class="pl-k">var</span> out <span class="pl-k">=</span> <span class="pl-smi">jshint</span>.<span class="pl-c1">data</span>(),</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L63" class="blob-num js-line-number" data-line-number="63"></td>
        <td id="file-01_jshint-js-LC63" class="blob-code blob-code-inner js-file-line">						errors <span class="pl-k">=</span> <span class="pl-smi">out</span>.<span class="pl-smi">errors</span>;</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L64" class="blob-num js-line-number" data-line-number="64"></td>
        <td id="file-01_jshint-js-LC64" class="blob-code blob-code-inner js-file-line">						<span class="pl-k">for</span>(<span class="pl-k">var</span> j <span class="pl-k">=</span> <span class="pl-c1">0</span>; j <span class="pl-k">&lt;</span> <span class="pl-smi">errors</span>.<span class="pl-c1">length</span>; j<span class="pl-k">++</span>) {</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L65" class="blob-num js-line-number" data-line-number="65"></td>
        <td id="file-01_jshint-js-LC65" class="blob-code blob-code-inner js-file-line">								<span class="pl-en">console</span>.<span class="pl-c1">log</span>(errors[j].<span class="pl-smi">line</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">&#39;</span>:<span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> errors[j].<span class="pl-smi">character</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">&#39;</span> -&gt; <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span> errors[j].<span class="pl-smi">reason</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">&#39;</span> -&gt; <span class="pl-pds">&#39;</span></span> <span class="pl-k">+</span></td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L66" class="blob-num js-line-number" data-line-number="66"></td>
        <td id="file-01_jshint-js-LC66" class="blob-code blob-code-inner js-file-line">errors[j].<span class="pl-smi">evidence</span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L67" class="blob-num js-line-number" data-line-number="67"></td>
        <td id="file-01_jshint-js-LC67" class="blob-code blob-code-inner js-file-line">						}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L68" class="blob-num js-line-number" data-line-number="68"></td>
        <td id="file-01_jshint-js-LC68" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>-----------------------------------------<span class="pl-pds">&#39;</span></span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L69" class="blob-num js-line-number" data-line-number="69"></td>
        <td id="file-01_jshint-js-LC69" class="blob-code blob-code-inner js-file-line">						<span class="pl-en">callback</span>(<span class="pl-c1">true</span>);</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L70" class="blob-num js-line-number" data-line-number="70"></td>
        <td id="file-01_jshint-js-LC70" class="blob-code blob-code-inner js-file-line">				}</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L71" class="blob-num js-line-number" data-line-number="71"></td>
        <td id="file-01_jshint-js-LC71" class="blob-code blob-code-inner js-file-line">		});</td>
      </tr>
      <tr>
        <td id="file-01_jshint-js-L72" class="blob-num js-line-number" data-line-number="72"></td>
        <td id="file-01_jshint-js-LC72" class="blob-code blob-code-inner js-file-line">}</td>
      </tr>
</table>

  </div>

  </div>
  
</div>


  <a name="comments"></a>
  <div class="discussion-timeline gist-discussion-timeline js-quote-selection-container ">
    <div class="js-discussion js-socket-channel" data-channel="agustinhaller/5e489e5419e43b11d7b7:marked-as-read:19593055">
      

  <div class="timeline-comment-wrapper js-comment-container">
    <a href="/LimeBlast"><img alt="@LimeBlast" class="timeline-comment-avatar" height="48" src="https://avatars3.githubusercontent.com/u/219206?v=3&amp;s=96" width="48" /></a>
    <div id="gistcomment-1454292"
     class="comment previewable-edit timeline-comment js-comment js-task-list-container "
     data-body-version="9827d602c0ae782281c778d6d9f0cdfd">

  <div class="timeline-comment-header ">




  <div class="timeline-comment-header-text">

    <strong>
      <a href="/LimeBlast" class="author">LimeBlast</a>
    </strong>

    commented

    <a href="#gistcomment-1454292" class="timestamp">
      <time datetime="2015-05-15T11:25:52Z" is="relative-time">May 15, 2015</time>
    </a>
  </div>
</div>


  <div class="comment-content">

    <div class="edit-comment-hide">
      <div class="comment-body markdown-body markdown-format js-comment-body">
          <p>Rather than putting all my code into the <code>js</code> folder, I've instead set-up a folder structure inside an <code>app</code> folder, which contains subfolders with additional javascript in them. How can I change this to search in subfolders too?</p>

<p>I've changed line 9 to <code>'app'</code>, and that picks up the <code>app.js</code> file inside it, bit nothing in any of the subfolders.</p>

<p>Cheers.</p>
      </div>
    </div>

  </div>
</div>

  </div>
  <div class="timeline-comment-wrapper js-comment-container">
    <a href="/paulking00"><img alt="@paulking00" class="timeline-comment-avatar" height="48" src="https://avatars3.githubusercontent.com/u/11030637?v=3&amp;s=96" width="48" /></a>
    <div id="gistcomment-1492139"
     class="comment previewable-edit timeline-comment js-comment js-task-list-container "
     data-body-version="8a9cb80965d32d5824bda864da70e544">

  <div class="timeline-comment-header ">




  <div class="timeline-comment-header-text">

    <strong>
      <a href="/paulking00" class="author">paulking00</a>
    </strong>

    commented

    <a href="#gistcomment-1492139" class="timestamp">
      <time datetime="2015-07-14T11:25:46Z" is="relative-time">Jul 14, 2015</time>
    </a>
  </div>
</div>


  <div class="comment-content">

    <div class="edit-comment-hide">
      <div class="comment-body markdown-body markdown-format js-comment-body">
          <p>Great, thank you!</p>

<p>I have forked a version to add 1st level folder recursion</p>

<p><a href="https://gist.github.com/paulking00/28f38ed875589c94f2f1">https://gist.github.com/paulking00/28f38ed875589c94f2f1</a></p>
      </div>
    </div>

  </div>
</div>

  </div>
  <div class="timeline-comment-wrapper js-comment-container">
    <a href="/krysalead"><img alt="@krysalead" class="timeline-comment-avatar" height="48" src="https://avatars1.githubusercontent.com/u/5586175?v=3&amp;s=96" width="48" /></a>
    <div id="gistcomment-1542005"
     class="comment previewable-edit timeline-comment js-comment js-task-list-container "
     data-body-version="926392e066e9cd772bd8300bd0297566">

  <div class="timeline-comment-header ">




  <div class="timeline-comment-header-text">

    <strong>
      <a href="/krysalead" class="author">krysalead</a>
    </strong>

    commented

    <a href="#gistcomment-1542005" class="timestamp">
      <time datetime="2015-08-04T15:09:41Z" is="relative-time">Aug 4, 2015</time>
    </a>
  </div>
</div>


  <div class="comment-content">

    <div class="edit-comment-hide">
      <div class="comment-body markdown-body markdown-format js-comment-body">
          <p>Thanks for this script<br>
I have modified with recursion, coloring, bug fixing<br>
<a href="https://gist.github.com/49b36b4c7c3b5984d833.git">https://gist.github.com/49b36b4c7c3b5984d833.git</a></p>
      </div>
    </div>

  </div>
</div>

  </div>
  <div class="timeline-comment-wrapper js-comment-container">
    <a href="/johnrobertcobbold"><img alt="@johnrobertcobbold" class="timeline-comment-avatar" height="48" src="https://avatars2.githubusercontent.com/u/307565?v=3&amp;s=96" width="48" /></a>
    <div id="gistcomment-1545545"
     class="comment previewable-edit timeline-comment js-comment js-task-list-container "
     data-body-version="f08e5947c4a8bbc4da9ef960ca51452c">

  <div class="timeline-comment-header ">




  <div class="timeline-comment-header-text">

    <strong>
      <a href="/johnrobertcobbold" class="author">johnrobertcobbold</a>
    </strong>

    commented

    <a href="#gistcomment-1545545" class="timestamp">
      <time datetime="2015-08-07T02:33:26Z" is="relative-time">Aug 7, 2015</time>
    </a>
  </div>
</div>


  <div class="comment-content">

    <div class="edit-comment-hide">
      <div class="comment-body markdown-body markdown-format js-comment-body">
          <p>Hi Agustin,<br>
Thanks for this. I ended up adding an array of files to ignore, i.e  <code>var filesToIgnore = [ 'angularfire.min.js', 'firebase.js', ... ]</code> and checking if the iterated file was one of them as these different files, which are not under my control, kept returning dozens of errors.</p>
      </div>
    </div>

  </div>
</div>

  </div>
  <div class="timeline-comment-wrapper js-comment-container">
    <a href="/LimeBlast"><img alt="@LimeBlast" class="timeline-comment-avatar" height="48" src="https://avatars3.githubusercontent.com/u/219206?v=3&amp;s=96" width="48" /></a>
    <div id="gistcomment-1596910"
     class="comment previewable-edit timeline-comment js-comment js-task-list-container "
     data-body-version="8302da92839e6ff898902833c8e2e6b2">

  <div class="timeline-comment-header ">




  <div class="timeline-comment-header-text">

    <strong>
      <a href="/LimeBlast" class="author">LimeBlast</a>
    </strong>

    commented

    <a href="#gistcomment-1596910" class="timestamp">
      <time datetime="2015-10-15T10:17:20Z" is="relative-time">Oct 15, 2015</time>
    </a>
  </div>
</div>


  <div class="comment-content">

    <div class="edit-comment-hide">
      <div class="comment-body markdown-body markdown-format js-comment-body">
          <p>Thank you, <a href="https://github.com/paulking00" class="user-mention">@paulking00</a>, that seems to work</p>
      </div>
    </div>

  </div>
</div>

  </div>



<!-- Rendered timeline since 2015-10-22 01:45:46 -->
<div id="partial-timeline-marker"
      class="js-timeline-marker js-socket-channel js-updatable-content"
      data-channel="agustinhaller/5e489e5419e43b11d7b7:gist:19593055"
      data-url="/agustinhaller/5e489e5419e43b11d7b7/show_partial?partial=gist%2Ftimeline_marker&amp;since=1445503546"
      data-last-modified="Thu, 22 Oct 2015 08:45:46 GMT"
      >
</div>


      <div class="discussion-timeline-actions">
          <div class="timeline-comment-wrapper timeline-new-comment js-comment-container">
  <a href="/verlak46"><img alt="@verlak46" class="timeline-comment-avatar" height="48" src="https://avatars3.githubusercontent.com/u/13036135?v=3&amp;s=96" width="48" /></a>

  <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/agustinhaller/5e489e5419e43b11d7b7/comments" class="js-new-comment-form" data-form-nonce="59d47b1d139791da77d2001e176eed7f53016522" data-remote="true" data-type="json" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="R+97d4FWGRGUoxG/YEtO2rAU3ktbTTOrHke8OgcKpwq1rv3KeAnXXWUtowdsK2tqsY0ghpB0x5/b+hpQfA5vwQ==" /></div>
    <div class="timeline-comment">
      
<div class="js-previewable-comment-form js-suggester-container previewable-comment-form write-selected" data-preview-url="/preview?markdown_unsupported=false&amp;subject=5e489e5419e43b11d7b7&amp;subject_type=Gist">
  <div class="comment-form-head tabnav">
      <div class="right">
          <a class="tabnav-extra" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
            <span aria-hidden="true" class="octicon octicon-markdown"></span>
            Styling with Markdown is supported
          </a>
      </div>
    <nav class="tabnav-tabs" role="tablist">
      <a href="#" class="tabnav-tab write-tab js-write-tab selected" role="tab" aria-selected="true">Write</a>
      <a href="#" class="tabnav-tab preview-tab js-preview-tab" role="tab">Preview</a>
    </nav>
  </div>

  <div class="comment-form-error js-comment-form-error" style="display:none">    There was an error creating your Gist.
</div>
  <div class="write-content js-write-bucket js-uploadable-container js-upload-markdown-image upload-enabled is-default"
      data-upload-policy-url="/upload/policies/assets"
      >

    <textarea name="comment[body]"
              tabindex="1"
              id="new_comment_field"
              placeholder="Leave a comment"
              aria-label="Comment body"
              class="input-contrast comment-form-textarea js-comment-field  js-task-list-field js-quick-submit js-size-to-fit js-quote-selection-target js-session-resumable js-suggester-field"
              ></textarea>

        <p class="drag-and-drop">
    <span class="default">
        Attach files by dragging &amp; dropping,
        <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
        <a class="manual-file-chooser-text" href="#">selecting them</a>, or pasting
        from the clipboard.
    </span>
    <span class="loading">
      <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" /> Uploading your files…
    </span>
    <span class="error bad-file">
      Unfortunately, we don’t support that file type.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again</a> with a
        PNG, GIF, JPG, DOCX, PPTX, XLSX, TXT, PDF, or ZIP.
      </span>
    </span>
    <span class="error bad-permissions">
      Attaching documents requires write permission to this repository.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again</a> with a PNG, GIF, or JPG.
      </span>
    </span>
    <span class="error repository-required">
      Unfortunately, we don’t support that file type.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again</a> with a PNG, GIF, or JPG.
      </span>
    </span>
    <span class="error too-big">
      Yowza, that’s a big file.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again</a> with a file smaller than 10MB.
      </span>
    </span>
    <span class="error empty">
      This file is empty.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again</a> with a file that’s not empty.
      </span>
    </span>
    <span class="error bad-browser">
      This browser doesn’t support file attachments.
      <span class="drag-and-drop-error-info">
        We recommend updating to the latest
        <a href="http://windows.microsoft.com/ie">Internet Explorer</a>,
        <a href="https://chrome.google.com">Google Chrome</a>, or
        <a href="https://www.mozilla.org/firefox">Firefox</a>.
      </span>
    </span>
    <span class="error failed-request">
      Something went really wrong, and we can’t process that file.
      <input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
      <span class="drag-and-drop-error-info">
        <a class="manual-file-chooser-text" href="#">Try again.</a>
      </span>
    </span>
  </p>


    <div class="suggester-container">
      <div class="suggester js-suggester js-navigation-container"
           data-url="/agustinhaller/5e489e5419e43b11d7b7/suggestions">
      </div>
    </div>
  </div>

  <div class="preview-content">
    <div class="comment">
  <div class="comment-content">
    <div class="comment-body markdown-body js-preview-body">
      <p>Nothing to preview</p>
    </div>
  </div>
</div>

  </div>



  <div class="comment-form-error comment-form-bottom js-comment-update-error"></div>
</div>


      <div class="form-actions">
        <div id="partial-new-comment-form-actions">
  <button type="submit" class="btn btn-primary" tabindex="2" data-disable-with data-disable-invalid>
    Comment
  </button>
</div>


      </div>
    </div>
</form></div>

      </div>
    </div>
  </div>
</div>
  </div>

  <div class="modal-backdrop"></div>
</div><!-- /.container -->

    </div><!-- /.gist-pjax-container -->
  </div>

    </div>

        <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
        <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
      <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
      <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
        <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>
        <li><a href="https://github.com/pricing" data-ga-click="Footer, go to pricing, text:pricing">Pricing</a></li>

    </ul>

    <a href="https://github.com" aria-label="Homepage">
      <span aria-hidden="true" class="mega-octicon octicon-mark-github" title="GitHub "></span>
</a>
    <ul class="site-footer-links">
      <li>&copy; 2016 <span title="0.08927s from github-fe122-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact</a></li>
        <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
    </ul>
  </div>
</div>



    
    
    

    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <button type="button" class="flash-close js-flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
        <span class="octicon octicon-x"></span>
      </button>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" integrity="sha256-7460qJ7p88i3YTMH/liaj1cFgX987ie+xRzl6WMjSr8=" src="https://assets-cdn.github.com/assets/frameworks-ef8eb4a89ee9f3c8b7613307fe589a8f5705817f7cee27bec51ce5e963234abf.js"></script>
      <script async="async" crossorigin="anonymous" integrity="sha256-CXm9s4pSEWmhMcvB1kgYF4aOPzr9ntBNjTtYHu1zktE=" src="https://assets-cdn.github.com/assets/github-0979bdb38a521169a131cbc1d6481817868e3f3afd9ed04d8d3b581eed7392d1.js"></script>
      
      
      
    <div class="js-stale-session-flash stale-session-flash flash flash-warn flash-banner hidden">
      <span class="octicon octicon-alert"></span>
      <span class="signed-in-tab-flash">You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
      <span class="signed-out-tab-flash">You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
    </div>
  </body>
</html>

