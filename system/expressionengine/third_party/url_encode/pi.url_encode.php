<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$plugin_info = array(
  'pi_name' => 'URL Encode',
  'pi_version' => '1.1',
  'pi_author' => 'Airtype Studio / BSD',
  'pi_author_url' => 'http://www.airtypestudio.com/',
  'pi_description' => 'Runs urlencode on a string of text.',
  'pi_usage' => URL_encode::usage()
  );

/**
 * URL_encode Class
 *
 * @package         ExpressionEngine
 * @category        Plugin
 * @author          Airtype Studio
 * @copyright       Copyright (c) 2010, Airtype Studio
 * @link            http://www.airtypestudio.com/
 */

class URL_encode {

var $return_data = "";

    // --------------------------------------------------------------------

    /**
     * URL_encode
     *
     * This function runs urlencode() on a string of text
     *
     * @access  public
     * @return  string
     */


  function URL_encode()
  {
    $this->EE =& get_instance();
    $type = $this->EE->TMPL->fetch_param("type");
    if ($type == "raw"){
      $this->return_data = rawurlencode($this->EE->TMPL->tagdata);
    } else {
      $this->return_data = urlencode($this->EE->TMPL->tagdata);  
    }
    
  }
  
    // --------------------------------------------------------------------

    /**
     * Usage
     *
     * This function describes how the plugin is used.
     *
     * @access  public
     * @return  string
     */
    
  //  Make sure and use output buffering

  function usage()
  {
    ob_start(); 
  ?>
The URL Encode plugin urlencodes your string to make it safe for Facebook's Like Button or other applications.

The tag pair is simply:
{exp:url_encode}URL{/exp:url_encode}

Example usage:

{exp:url_encode}http://www.airtypestudio.com/{/exp:url_encode}

    becomes:
    
http%3A%2F%2Fwww.airtypestudio.com%2F

You can also specify the plugin use 'rawurlencode()':

{exp:url_encode type="raw"}The quick fox jumped over the lazy dog.{/exp:url_encode}

becomes:

The%20quick%20fox%20jumped%20over%20the%20lazy%20dog.


  <?php
    $buffer = ob_get_contents();
    
    ob_end_clean(); 

    return $buffer;
  }
  // END

  

}

/* End of file pi.url_encode.php */ 
/* Location: ./system/expressionengine/third_party/url_encode/pi.url_encode.php */